<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreYoungPersonRequest;
use App\Http\Requests\UpdateYoungPersonRequest;
use App\Models\Guardian;
use App\Models\YoungPerson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class YoungPersonController extends Controller
{
    public function index(Request $request)
    {
        abort_unless($request->user()->can('manage youth'), 403);

        $search = $request->string('search');

        $collection = YoungPerson::with(['guardians', 'tokenAccount'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('preferred_name', 'like', "%{$search}%");
                });
            })
            ->orderBy('first_name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Youth/Index', [
            'youth' => $collection,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(StoreYoungPersonRequest $request)
    {
        $youngPerson = YoungPerson::create($request->validated());
        $youngPerson->tokenAccount()->firstOrCreate([], ['balance' => 0]);

        return redirect()->route('admin.youth.show', $youngPerson)->with('success', 'Young person created');
    }

    public function show(YoungPerson $youngPerson)
    {
        abort_unless(auth()->user()->can('manage youth'), 403);

        $youngPerson->load([
            'guardians',
            'consents' => fn ($q) => $q->latest()->limit(5),
            'tokenAccount',
            'attendanceRecords' => fn ($q) => $q->with('session')->latest()->limit(10),
        ])->loadCount('tokenTransactions');

        $availableGuardians = Guardian::orderBy('first_name')->get();

        return Inertia::render('Admin/Youth/Show', [
            'youth' => $youngPerson,
            'guardians' => $availableGuardians,
        ]);
    }

    public function update(UpdateYoungPersonRequest $request, YoungPerson $youngPerson)
    {
        $youngPerson->update($request->validated());

        return back()->with('success', 'Profile updated');
    }

    public function destroy(YoungPerson $youngPerson)
    {
        abort_unless(auth()->user()->can('manage youth'), 403);

        $youngPerson->delete();

        return redirect()->route('admin.youth.index')->with('success', 'Record archived');
    }
}
