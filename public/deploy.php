<?php
/**
 * Web-based Laravel Deployment Script
 *
 * Access this file via: http://your-domain.com/deploy.php
 *
 * SECURITY: Delete this file after deployment or add password protection!
 */

// Simple password protection - CHANGE THIS PASSWORD!
$DEPLOY_PASSWORD = 'change-me-to-something-secret';

// Check password
if (!isset($_GET['password']) || $_GET['password'] !== $DEPLOY_PASSWORD) {
    die('❌ Unauthorized. Usage: deploy.php?password=your-password');
}

header('Content-Type: text/plain; charset=utf-8');

echo "====================================\n";
echo "🚀 Laravel Deployment Started\n";
echo "====================================\n\n";

$baseDir = dirname(__DIR__);
chdir($baseDir);

// Function to run command and show output
function runCommand($command, $description) {
    echo "▶ {$description}...\n";

    // Check if exec is available
    if (!function_exists('exec')) {
        echo "⚠️  Warning: exec() function is disabled. Skipping: {$description}\n\n";
        return false;
    }

    $output = [];
    $returnVar = 0;
    exec($command . ' 2>&1', $output, $returnVar);

    if ($returnVar === 0) {
        echo "✅ Success\n";
        if (!empty($output)) {
            echo implode("\n", $output) . "\n";
        }
    } else {
        echo "❌ Failed (Exit code: {$returnVar})\n";
        if (!empty($output)) {
            echo implode("\n", $output) . "\n";
        }
    }
    echo "\n";

    return $returnVar === 0;
}

// Check if artisan exists
if (!file_exists($baseDir . '/artisan')) {
    die("❌ Error: artisan file not found. Make sure you're in the Laravel root directory.\n");
}

// 1. Git Pull (if available)
echo "1️⃣ PULLING LATEST CODE\n";
echo "------------------------------------\n";
if (is_dir($baseDir . '/.git')) {
    runCommand('git fetch origin', 'Fetching from origin');
    runCommand('git reset --hard origin/main', 'Resetting to origin/main');
} else {
    echo "⚠️  Not a git repository. Skipping git pull.\n\n";
}

// 2. Clear caches
echo "2️⃣ CLEARING CACHES\n";
echo "------------------------------------\n";
runCommand('php artisan config:clear', 'Clearing config cache');
runCommand('php artisan cache:clear', 'Clearing application cache');
runCommand('php artisan view:clear', 'Clearing view cache');
runCommand('php artisan route:clear', 'Clearing route cache');

// 3. Optimize for production
echo "3️⃣ OPTIMIZING FOR PRODUCTION\n";
echo "------------------------------------\n";
runCommand('php artisan config:cache', 'Caching configuration');
runCommand('php artisan route:cache', 'Caching routes');
runCommand('php artisan view:cache', 'Caching views');

// 4. Storage link
echo "4️⃣ STORAGE SYMLINK\n";
echo "------------------------------------\n";
runCommand('php artisan storage:link', 'Creating storage symlink');

// 5. Set permissions
echo "5️⃣ SETTING PERMISSIONS\n";
echo "------------------------------------\n";

$directories = [
    'storage',
    'storage/framework',
    'storage/framework/cache',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/logs',
    'bootstrap/cache'
];

foreach ($directories as $dir) {
    $fullPath = $baseDir . '/' . $dir;
    if (is_dir($fullPath)) {
        if (@chmod($fullPath, 0775)) {
            echo "✅ Set permissions on {$dir}\n";
        } else {
            echo "⚠️  Could not set permissions on {$dir} (may need manual fix)\n";
        }
    }
}
echo "\n";

// 6. Verify .env file
echo "6️⃣ CHECKING ENVIRONMENT\n";
echo "------------------------------------\n";
if (file_exists($baseDir . '/.env')) {
    echo "✅ .env file exists\n";

    // Check critical settings
    $env = file_get_contents($baseDir . '/.env');
    $checks = [
        'APP_KEY=' => 'Application key is set',
        'DB_DATABASE=' => 'Database name is configured',
        'DB_USERNAME=' => 'Database username is configured',
        'APP_ENV=production' => 'Environment is set to production',
    ];

    foreach ($checks as $setting => $message) {
        if (strpos($env, $setting) !== false) {
            echo "✅ {$message}\n";
        } else {
            echo "⚠️  {$message} - CHECK THIS!\n";
        }
    }
} else {
    echo "❌ .env file missing! Copy .env.production.example to .env\n";
}
echo "\n";

echo "====================================\n";
echo "✅ DEPLOYMENT COMPLETE!\n";
echo "====================================\n\n";

echo "Next steps:\n";
echo "1. Visit your site: " . ($_ENV['APP_URL'] ?? 'http://your-site.com') . "\n";
echo "2. Check for errors in storage/logs/laravel.log\n";
echo "3. DELETE THIS FILE (deploy.php) for security!\n\n";

echo "Timestamp: " . date('Y-m-d H:i:s') . "\n";
