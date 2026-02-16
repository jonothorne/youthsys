<?php

namespace App\Services;

use App\Models\TokenAccount;
use App\Models\TokenTransaction;
use App\Models\YoungPerson;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TokenService
{
    public function adjust(YoungPerson $youngPerson, int $amount, string $type, ?string $reason, ?int $performedBy = null, ?string $batchId = null): TokenTransaction
    {
        return DB::transaction(function () use ($youngPerson, $amount, $type, $reason, $performedBy, $batchId) {
            $account = $youngPerson->tokenAccount()->lockForUpdate()->first();

            if (!$account) {
                $account = TokenAccount::create([
                    'young_person_id' => $youngPerson->id,
                    'balance' => 0,
                ]);
            }

            $batch = $batchId ?? (string) Str::uuid();

            $transaction = $account->transactions()->create([
                'young_person_id' => $youngPerson->id,
                'performed_by' => $performedBy,
                'amount' => $amount,
                'type' => $type,
                'reason' => $reason,
                'batch_id' => $batch,
            ]);

            $account->update([
                'balance' => $account->balance + $amount,
                'last_transaction_at' => now(),
            ]);

            return $transaction;
        });
    }
}
