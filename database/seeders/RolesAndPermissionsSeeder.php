<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            'manage youth',
            'manage guardians',
            'manage consents',
            'manage attendance',
            'view analytics',
            'manage tokens',
            'operate tokens',
            'manage users',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo($permissions);

        $tokenOperator = Role::firstOrCreate(['name' => 'token_operator']);
        $tokenOperator->syncPermissions([
            'operate tokens',
        ]);
    }
}
