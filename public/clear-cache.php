<?php
/**
 * Clear Laravel caches
 * Visit: http://youth.alivechur.ch/clear-cache.php
 * DELETE THIS FILE after use!
 */

// Simple password protection
$password = 'clear123'; // Change this!

if (!isset($_GET['password']) || $_GET['password'] !== $password) {
    die('Unauthorized. Usage: clear-cache.php?password=clear123');
}

echo "<h1>Laravel Cache Clearer</h1>";
echo "<pre>";

// Change to Laravel root
chdir(__DIR__ . '/..');

// Clear various caches by deleting cache files
$directories = [
    'storage/framework/cache/data' => 'Application cache',
    'storage/framework/views' => 'Compiled views',
    'storage/framework/sessions' => 'Sessions',
    'bootstrap/cache' => 'Config/routes cache'
];

foreach ($directories as $dir => $description) {
    echo "Clearing {$description}...\n";
    $fullPath = __DIR__ . '/../' . $dir;

    if (is_dir($fullPath)) {
        $files = glob($fullPath . '/*');
        $count = 0;
        foreach ($files as $file) {
            if (is_file($file) && basename($file) !== '.gitignore') {
                if (@unlink($file)) {
                    $count++;
                }
            }
        }
        echo "  ✓ Cleared {$count} files from {$dir}\n";
    } else {
        echo "  ⚠ Directory not found: {$dir}\n";
    }
}

echo "\n";
echo "====================================\n";
echo "✅ Cache cleared!\n";
echo "====================================\n";
echo "\nDELETE THIS FILE NOW for security!\n";
echo "</pre>";
