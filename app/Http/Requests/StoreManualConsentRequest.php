<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreManualConsentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage youth') ?? false;
    }

    public function rules(): array
    {
        return [
            'guardian_id' => ['nullable', 'exists:guardians,id'],
            'signature_name' => ['nullable', 'string', 'max:255'],
            'general_attendance' => ['boolean'],
            'offsite_events' => ['boolean'],
            'media_consent' => ['boolean'],
            'medical_treatment' => ['boolean'],
            'transport' => ['boolean'],
        ];
    }
}

