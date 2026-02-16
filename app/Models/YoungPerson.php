<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class YoungPerson extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'preferred_name',
        'date_of_birth',
        'gender',
        'school_year',
        'school_name',
        'primary_language',
        'allergies',
        'medical_notes',
        'medications',
        'dietary_requirements',
        'doctor_name',
        'doctor_phone',
        'photo_consent',
        'active',
        'status',
        'activated_at',
        'metadata',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'photo_consent' => 'boolean',
        'active' => 'boolean',
        'activated_at' => 'datetime',
        'metadata' => 'array',
    ];

    public function guardians()
    {
        return $this->belongsToMany(Guardian::class)
            ->withPivot([
                'relationship',
                'is_primary',
                'contact_order',
                'can_pickup',
                'receives_notifications',
            ])->withTimestamps();
    }

    public function consents()
    {
        return $this->hasMany(Consent::class);
    }

    public function latestConsent()
    {
        return $this->hasOne(Consent::class)->latestOfMany();
    }

    public function attendanceRecords()
    {
        return $this->hasMany(AttendanceRecord::class);
    }

    public function tokenAccount()
    {
        return $this->hasOne(TokenAccount::class);
    }

    public function tokenTransactions()
    {
        return $this->hasMany(TokenTransaction::class);
    }
}
