<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TokenAdjustmentRequest;
use App\Models\TokenAccount;
use App\Models\TokenTransaction;
use App\Models\YoungPerson;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TokenController extends Controller
{
    public function index(Request $request)
    {
        abort_unless(auth()->user()->can('operate tokens') || auth()->user()->can('manage tokens'), 403);

        $search = $request->string('search');

        $accounts = YoungPerson::with('tokenAccount')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            })
            ->orderBy('first_name')
            ->get();

        $recentTransactions = TokenTransaction::with('youngPerson')
            ->latest()
            ->limit(15)
            ->get();

        return Inertia::render('Admin/Tokens/Index', [
            'accounts' => $accounts,
            'recentTransactions' => $recentTransactions,
        ]);
    }

    public function adjust(TokenAdjustmentRequest $request, TokenService $tokenService)
    {
        $userId = $request->user()->id;
        $amount = $request->integer('amount');
        $reason = $request->string('reason');
        $type = $amount > 0 ? 'award' : 'spend';
        $batch = $request->input('batch_id');

        foreach ($request->validated('young_person_ids') as $id) {
            $youngPerson = YoungPerson::findOrFail($id);
            $tokenService->adjust($youngPerson, $amount, $type, $reason, $userId, $batch);
        }

        return back()->with('success', 'Tokens updated');
    }
}
