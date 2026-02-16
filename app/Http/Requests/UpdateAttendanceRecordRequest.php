<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAttendanceRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('manage attendance') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'records' => ['required', 'array'],
            'records.*.id' => ['required', 'exists:attendance_records,id'],
            'records.*.status' => ['required', 'in:present,late,absent,excused'],
            'records.*.notes' => ['nullable', 'string'],
        ];
    }
}
