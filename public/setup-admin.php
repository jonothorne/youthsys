<?php
/**
 * Create Admin User
 * Visit: http://youth.alivechur.ch/setup-admin.php?password=setup123&email=your@email.com
 * DELETE THIS FILE after use!
 */

$setupPassword = 'setup123'; // Change this!

if (!isset($_GET['password']) || $_GET['password'] !== $setupPassword) {
    die('Unauthorized. Usage: setup-admin.php?password=setup123&email=your@email.com');
}

if (!isset($_GET['email'])) {
    die('Please provide email: setup-admin.php?password=setup123&email=your@email.com');
}

// Change to Laravel root
chdir(__DIR__ . '/..');
require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$email = $_GET['email'];

echo "<h1>Admin User Setup</h1>";
echo "<pre>";

try {
    // Find user by email
    $user = App\Models\User::where('email', $email)->first();

    if (!$user) {
        echo "❌ User with email '{$email}' not found.\n";
        echo "\nAvailable users:\n";
        foreach (App\Models\User::all() as $u) {
            echo "  - {$u->email} (ID: {$u->id})\n";
        }
        die();
    }

    echo "✓ Found user: {$user->email} (ID: {$user->id})\n\n";

    // Get admin role
    $adminRole = Spatie\Permission\Models\Role::where('name', 'admin')->first();

    if (!$adminRole) {
        echo "❌ Admin role not found. Creating it...\n";
        $adminRole = Spatie\Permission\Models\Role::create(['name' => 'admin']);
        echo "✓ Created admin role\n";
    }

    // Assign all permissions to admin role
    $permissions = Spatie\Permission\Models\Permission::all();
    echo "✓ Found {$permissions->count()} permissions\n";
    $adminRole->syncPermissions($permissions);
    echo "✓ Assigned all permissions to admin role\n\n";

    // Remove existing roles from user
    $user->roles()->detach();
    echo "✓ Cleared existing roles\n";

    // Assign admin role to user
    $user->assignRole('admin');
    echo "✓ Assigned admin role to user\n\n";

    // Clear permission cache
    app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    echo "✓ Cleared permission cache\n\n";

    echo "====================================\n";
    echo "✅ SUCCESS!\n";
    echo "====================================\n";
    echo "\n{$user->email} is now an admin.\n";
    echo "\nNext steps:\n";
    echo "1. DELETE THIS FILE immediately!\n";
    echo "2. Visit: http://youth.alivechur.ch/clear-cache.php?password=clear123\n";
    echo "3. Try accessing dashboard again\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "\nStack trace:\n" . $e->getTraceAsString();
}

echo "</pre>";
