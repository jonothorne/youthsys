<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AttendanceSession;
use App\Models\TokenAccount;
use App\Models\YoungPerson;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'query' => ['required', 'string', 'max:255'],
        ]);

        $term = $request->string('query');

        $results = [
            'youth' => YoungPerson::query()
                ->select('id', 'first_name', 'last_name', 'preferred_name')
                ->where('first_name', 'like', "%{$term}%")
                ->orWhere('last_name', 'like', "%{$term}%")
                ->limit(5)
                ->get()
                ->map(fn ($person) => [
                    'id' => $person->id,
                    'label' => $person->first_name.' '.$person->last_name,
                    'subtitle' => $person->preferred_name ? 'Prefers '.$person->preferred_name : 'Youth profile',
                    'route' => route('admin.youth.show', $person),
                    'type' => 'Young Person',
                ]),
            'sessions' => AttendanceSession::query()
                ->select('id', 'name', 'session_date')
                ->where('name', 'like', "%{$term}%")
                ->orWhereDate('session_date', $term)
                ->limit(5)
                ->get()
                ->map(fn ($session) => [
                    'id' => $session->id,
                    'label' => $session->name,
                    'subtitle' => $session->session_date?->format('j M Y'),
                    'route' => route('admin.attendance.show', $session),
                    'type' => 'Session',
                ]),
            'tokens' => TokenAccount::with('youngPerson')
                ->whereHas('youngPerson', function ($query) use ($term) {
                    $query->where('first_name', 'like', "%{$term}%")
                        ->orWhere('last_name', 'like', "%{$term}%");
                })
                ->limit(5)
                ->get()
                ->map(fn ($account) => [
                    'id' => $account->youngPerson->id,
                    'label' => $account->youngPerson->first_name.' '.$account->youngPerson->last_name,
                    'subtitle' => 'Tokens: '.$account->balance,
                    'route' => route('admin.tokens.index'),
                    'type' => 'Token Account',
                ]),
        ];

        return response()->json([
            'results' => collect($results)->flatten(1)->take(12)->values(),
        ]);
    }
}
