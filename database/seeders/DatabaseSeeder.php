<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesAndPermissionsSeeder::class);

        if (!User::where('email', config('youthsys.admin_email', 'admin@youthsys.test'))->exists()) {
            $admin = User::factory()->create([
                'name' => 'Alive Youth Admin',
                'email' => config('youthsys.admin_email', 'admin@youthsys.test'),
                'password' => Hash::make('password'),
            ]);

            $admin->assignRole('admin');
        }
    }
}
