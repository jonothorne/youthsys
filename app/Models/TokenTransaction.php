<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'token_account_id',
        'young_person_id',
        'performed_by',
        'amount',
        'type',
        'reason',
        'batch_id',
        'meta',
    ];

    protected $casts = [
        'amount' => 'integer',
        'meta' => 'array',
    ];

    public function account()
    {
        return $this->belongsTo(TokenAccount::class, 'token_account_id');
    }

    public function youngPerson()
    {
        return $this->belongsTo(YoungPerson::class);
    }

    public function performer()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }
}
