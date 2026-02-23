<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGuardianRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage youth') ?? false;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'preferred_name' => ['nullable', 'string', 'max:255'],
            'primary_phone' => ['required', 'string', 'max:30'],
            'secondary_phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'address_line1' => ['nullable', 'string', 'max:255'],
            'address_line2' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:120'],
            'postcode' => ['nullable', 'string', 'max:20'],
            'relationship' => ['nullable', 'string', 'max:120'],
            'preferred_contact_method' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string'],
            'is_emergency_contact' => ['boolean'],
            'is_primary' => ['boolean'],
            'contact_order' => ['nullable', 'integer', 'min:1', 'max:10'],
            'can_pickup' => ['boolean'],
            'receives_notifications' => ['boolean'],
        ];
    }
}

