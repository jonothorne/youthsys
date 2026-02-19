<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnrolmentRequest;
use App\Models\Consent;
use App\Models\Guardian;
use App\Models\TokenAccount;
use App\Models\YoungPerson;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EnrolmentController extends Controller
{
    public function create()
    {
        return Inertia::render('Enrolment/Form');
    }

    public function store(StoreEnrolmentRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $guardianData = $this->sanitizeFields($data['guardian']);
            $youngPersonData = $this->sanitizeFields($data['young_person']);
            $consentData = $this->sanitizeFields($data['consents']);

            $guardian = Guardian::create($guardianData);

            $youngPerson = YoungPerson::create(array_merge(
                $youngPersonData,
                [
                    'status' => 'pending',
                    'active' => false,
                ]
            ));

            $youngPerson->guardians()->attach($guardian->id, [
                'relationship' => $data['guardian']['relationship'] ?? null,
                'is_primary' => true,
                'contact_order' => 1,
                'receives_notifications' => true,
            ]);

            $consentPayload = array_merge($consentData, [
                'young_person_id' => $youngPerson->id,
                'guardian_id' => $guardian->id,
                'signed_at' => now(),
                'signed_ip' => request()->ip(),
                'document_version' => '1.0',
            ]);

            Consent::create($consentPayload);

            TokenAccount::firstOrCreate([
                'young_person_id' => $youngPerson->id,
            ]);
        });

        return redirect()->route('enrolment.thank-you');
    }

    protected function sanitizeFields(array $fields): array
    {
        $placeholders = collect(['na', 'n/a', 'none', 'nil', 'not applicable', 'no']);

        return collect($fields)->map(function ($value) use ($placeholders) {
            if (!is_string($value)) {
                return $value;
            }

            $trimmed = trim($value);
            if ($trimmed === '') {
                return null;
            }

            $normalized = strtolower($trimmed);
            return $placeholders->contains($normalized) ? null : $value;
        })->toArray();
    }
}
