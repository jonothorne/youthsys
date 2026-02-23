<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreManualConsentRequest;
use App\Models\Consent;
use App\Models\YoungPerson;

class YoungPersonConsentController extends Controller
{
    public function store(StoreManualConsentRequest $request, YoungPerson $youngPerson)
    {
        $payload = array_merge($request->validated(), [
            'young_person_id' => $youngPerson->id,
            'signed_at' => now(),
            'signed_ip' => $request->ip(),
            'signature_method' => 'admin_update',
            'document_version' => 'admin',
        ]);

        Consent::create($payload);

        return back()->with('success', 'Permissions updated');
    }
}

