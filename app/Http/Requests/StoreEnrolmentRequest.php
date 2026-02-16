<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEnrolmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'guardian.first_name' => ['required', 'string', 'max:255'],
            'guardian.last_name' => ['required', 'string', 'max:255'],
            'guardian.email' => ['nullable', 'email', 'max:255'],
            'guardian.primary_phone' => ['required', 'string', 'max:30'],
            'guardian.secondary_phone' => ['nullable', 'string', 'max:30'],
            'guardian.address_line1' => ['nullable', 'string', 'max:255'],
            'guardian.address_line2' => ['nullable', 'string', 'max:255'],
            'guardian.city' => ['nullable', 'string', 'max:120'],
            'guardian.postcode' => ['nullable', 'string', 'max:20'],
            'guardian.relationship' => ['nullable', 'string', 'max:120'],
            'young_person.first_name' => ['required', 'string', 'max:255'],
            'young_person.last_name' => ['required', 'string', 'max:255'],
            'young_person.preferred_name' => ['nullable', 'string', 'max:255'],
            'young_person.date_of_birth' => ['required', 'date'],
            'young_person.gender' => ['nullable', 'string', 'max:20'],
            'young_person.school_year' => ['nullable', 'string', 'max:30'],
            'young_person.school_name' => ['nullable', 'string', 'max:255'],
            'young_person.allergies' => ['nullable', 'string'],
            'young_person.medications' => ['nullable', 'string'],
            'young_person.medical_notes' => ['nullable', 'string'],
            'young_person.dietary_requirements' => ['nullable', 'string'],
            'consents.general_attendance' => ['accepted'],
            'consents.offsite_events' => ['boolean'],
            'consents.media_consent' => ['boolean'],
            'consents.medical_treatment' => ['boolean'],
            'consents.transport' => ['boolean'],
            'consents.signature_name' => ['required', 'string', 'max:255'],
        ];
    }
}
