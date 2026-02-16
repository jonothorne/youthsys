<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'young_person_id',
        'balance',
        'last_transaction_at',
        'is_locked',
        'meta',
    ];

    protected $casts = [
        'balance' => 'integer',
        'last_transaction_at' => 'datetime',
        'is_locked' => 'boolean',
        'meta' => 'array',
    ];

    public function youngPerson()
    {
        return $this->belongsTo(YoungPerson::class);
    }

    public function transactions()
    {
        return $this->hasMany(TokenTransaction::class);
    }
}
