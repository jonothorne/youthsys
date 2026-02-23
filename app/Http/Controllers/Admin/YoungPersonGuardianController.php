<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateGuardianRequest;
use App\Models\Guardian;
use App\Models\YoungPerson;
use Illuminate\Support\Arr;

class YoungPersonGuardianController extends Controller
{
    public function update(UpdateGuardianRequest $request, YoungPerson $youngPerson, Guardian $guardian)
    {
        abort_unless($youngPerson->guardians()->where('guardians.id', $guardian->id)->exists(), 404);

        $data = $request->validated();

        $guardianFields = Arr::except($data, [
            'relationship',
            'is_primary',
            'contact_order',
            'can_pickup',
            'receives_notifications',
        ]);

        $pivotFields = Arr::only($data, [
            'relationship',
            'is_primary',
            'contact_order',
            'can_pickup',
            'receives_notifications',
        ]);

        $guardian->update($guardianFields);

        if (!empty($pivotFields)) {
            $youngPerson->guardians()->updateExistingPivot($guardian->id, $pivotFields);
        }

        return back()->with('success', 'Guardian updated');
    }
}

