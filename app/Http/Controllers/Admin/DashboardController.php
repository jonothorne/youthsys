<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use App\Models\AttendanceSession;
use App\Models\TokenAccount;
use App\Models\YoungPerson;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $user = auth()->user();

        if (!$user->can('view analytics')) {
            if ($user->can('operate tokens')) {
                return redirect()->route('admin.tokens.index');
            }

            abort(403);
        }

        $stats = [
            'active_youth' => YoungPerson::where('active', true)->count(),
            'pending_youth' => YoungPerson::where('status', 'pending')->count(),
            'sessions_this_month' => AttendanceSession::whereBetween('session_date', [now()->startOfMonth(), now()->endOfMonth()])->count(),
            'average_attendance' => AttendanceRecord::where('status', 'present')
                ->whereHas('session', fn ($q) => $q->whereBetween('session_date', [now()->subMonths(1), now()]))
                ->count(),
            'token_liability' => TokenAccount::sum('balance'),
        ];

        $attendanceByWeek = AttendanceSession::withCount(['records as present_count' => function ($query) {
            $query->where('status', 'present');
        }])->latest('session_date')->limit(6)->get(['id', 'session_date'])
            ->map(fn ($session) => [
                'id' => $session->id,
                'session_date' => $session->session_date,
                'present_count' => $session->present_count,
            ]);

        $ageBuckets = YoungPerson::whereNotNull('date_of_birth')
            ->get()
            ->groupBy(function ($person) {
                $age = $person->date_of_birth?->age ?? 0;

                return match (true) {
                    $age < 12 => '10-11',
                    $age < 14 => '12-13',
                    $age < 16 => '14-15',
                    default => '16+',
                };
            })
            ->map->count()
            ->toArray();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'attendanceRecent' => $attendanceByWeek,
            'ageBuckets' => $ageBuckets,
        ]);
    }
}
