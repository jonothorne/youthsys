<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_date',
        'session_type',
        'name',
        'location',
        'expected_count',
        'opens_at',
        'closes_at',
        'is_locked',
        'created_by',
        'notes',
    ];

    protected $casts = [
        'session_date' => 'date',
        'opens_at' => 'datetime',
        'closes_at' => 'datetime',
        'is_locked' => 'boolean',
    ];

    public function records()
    {
        return $this->hasMany(AttendanceRecord::class);
    }

    public function attendees()
    {
        return $this->belongsToMany(YoungPerson::class, 'attendance_records')
            ->withPivot(['status', 'checked_in_at', 'checked_out_at'])
            ->withTimestamps();
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
