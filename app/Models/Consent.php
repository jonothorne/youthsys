<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consent extends Model
{
    use HasFactory;

    protected $fillable = [
        'young_person_id',
        'guardian_id',
        'general_attendance',
        'offsite_events',
        'media_consent',
        'medical_treatment',
        'transport',
        'signature_name',
        'signature_method',
        'signed_at',
        'signed_ip',
        'document_version',
        'extra',
    ];

    protected $casts = [
        'general_attendance' => 'boolean',
        'offsite_events' => 'boolean',
        'media_consent' => 'boolean',
        'medical_treatment' => 'boolean',
        'transport' => 'boolean',
        'signed_at' => 'datetime',
        'extra' => 'array',
    ];

    public function youngPerson()
    {
        return $this->belongsTo(YoungPerson::class);
    }

    public function guardian()
    {
        return $this->belongsTo(Guardian::class);
    }
}
