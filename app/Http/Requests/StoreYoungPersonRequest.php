<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreYoungPersonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('manage youth') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'preferred_name' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'string', 'max:20'],
            'school_year' => ['nullable', 'string', 'max:25'],
            'school_name' => ['nullable', 'string', 'max:255'],
            'primary_language' => ['nullable', 'string', 'max:120'],
            'allergies' => ['nullable', 'string'],
            'medical_notes' => ['nullable', 'string'],
            'medications' => ['nullable', 'string'],
            'dietary_requirements' => ['nullable', 'string'],
            'doctor_name' => ['nullable', 'string', 'max:255'],
            'doctor_phone' => ['nullable', 'string', 'max:30'],
            'photo_consent' => ['boolean'],
            'active' => ['boolean'],
            'status' => ['nullable', 'string', 'max:20'],
        ];
    }
}
