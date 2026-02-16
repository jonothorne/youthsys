<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guardian extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'preferred_name',
        'primary_phone',
        'secondary_phone',
        'email',
        'address_line1',
        'address_line2',
        'city',
        'postcode',
        'relationship',
        'preferred_contact_method',
        'notes',
        'is_emergency_contact',
    ];

    protected $casts = [
        'is_emergency_contact' => 'boolean',
    ];

    public function youngPeople()
    {
        return $this->belongsToMany(YoungPerson::class)
            ->withPivot([
                'relationship',
                'is_primary',
                'contact_order',
                'can_pickup',
                'receives_notifications',
            ])->withTimestamps();
    }
}
