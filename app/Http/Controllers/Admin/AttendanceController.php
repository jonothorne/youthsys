<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttendanceSessionRequest;
use App\Http\Requests\UpdateAttendanceRecordRequest;
use App\Models\AttendanceRecord;
use App\Models\AttendanceSession;
use App\Models\YoungPerson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        abort_unless(auth()->user()->can('manage attendance'), 403);

        $activeSessions = AttendanceSession::withCount(['records as present_count' => function ($query) {
            $query->where('status', 'present');
        }])
            ->where('archived', false)
            ->latest('session_date')
            ->get();

        $archivedSessions = AttendanceSession::withCount(['records as present_count' => function ($query) {
            $query->where('status', 'present');
        }])
            ->where('archived', true)
            ->latest('session_date')
            ->get();

        return Inertia::render('Admin/Attendance/Index', [
            'sessions' => $activeSessions,
            'archivedSessions' => $archivedSessions,
        ]);
    }

    public function store(StoreAttendanceSessionRequest $request)
    {
        $payload = $request->validated();

        $session = AttendanceSession::whereDate('session_date', $payload['session_date'])
            ->where('session_type', $payload['session_type'])
            ->first();

        if (!$session) {
            $session = AttendanceSession::create(array_merge($payload, [
                'created_by' => $request->user()->id,
            ]));
        }

        $created = $session->wasRecentlyCreated ?? false;

        $this->seedRecords($session);

        $message = $created ? 'Session created' : 'Session already existed, opening register';

        return redirect()->route('admin.attendance.show', $session)->with('success', $message);
    }

    public function show(AttendanceSession $attendanceSession)
    {
        abort_unless(auth()->user()->can('manage attendance'), 403);
        $this->seedRecords($attendanceSession);

        $attendanceSession->load(['records.youngPerson' => fn ($q) => $q->with('guardians')->orderBy('first_name')]);

        return Inertia::render('Admin/Attendance/Show', [
            'session' => $attendanceSession,
        ]);
    }

    public function updateRecords(UpdateAttendanceRecordRequest $request, AttendanceSession $attendanceSession)
    {
        abort_unless(auth()->user()->can('manage attendance'), 403);

        DB::transaction(function () use ($request) {
            foreach ($request->validated('records') as $recordPayload) {
                AttendanceRecord::whereKey($recordPayload['id'])->update([
                    'status' => $recordPayload['status'],
                    'notes' => $recordPayload['notes'] ?? null,
                ]);
            }
        });

        return back()->with('success', 'Attendance updated');
    }

    public function archive(AttendanceSession $attendanceSession)
    {
        abort_unless(auth()->user()->can('manage attendance'), 403);

        $attendanceSession->update(['archived' => true]);

        return back()->with('success', 'Session archived');
    }

    public function restore(AttendanceSession $attendanceSession)
    {
        abort_unless(auth()->user()->can('manage attendance'), 403);

        $attendanceSession->update(['archived' => false]);

        return back()->with('success', 'Session restored');
    }

    public function destroy(AttendanceSession $attendanceSession)
    {
        abort_unless(auth()->user()->can('manage attendance'), 403);

        $attendanceSession->records()->delete();
        $attendanceSession->delete();

        return redirect()->route('admin.attendance.index')->with('success', 'Session deleted');
    }

    protected function seedRecords(AttendanceSession $session): void
    {
        $activeYouth = YoungPerson::where('active', true)->get(['id']);

        foreach ($activeYouth as $youngPerson) {
            AttendanceRecord::firstOrCreate([
                'attendance_session_id' => $session->id,
                'young_person_id' => $youngPerson->id,
            ], [
                'status' => 'absent',
            ]);
        }
    }
}
