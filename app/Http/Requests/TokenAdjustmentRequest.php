<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TokenAdjustmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();

        return $user?->can('manage tokens') || $user?->can('operate tokens');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'young_person_ids' => ['required', 'array', 'min:1'],
            'young_person_ids.*' => ['integer', 'exists:young_people,id'],
            'amount' => ['required', 'integer', 'not_in:0'],
            'reason' => ['nullable', 'string', 'max:255'],
        ];
    }
}
