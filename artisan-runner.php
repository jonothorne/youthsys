<?php
use Illuminate\Contracts\Console\Kernel;

if (php_sapi_name() !== 'cli') {
    header('Content-Type: text/plain');
}

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Kernel::class);

try {
    $kernel->call('key:generate', ['--force' => true]);
    $kernel->call('migrate', ['--force' => true]);
    $kernel->call('db:seed', ['--force' => true]);
    echo "Application key set, migrations and seeds complete.";
} catch (Exception $e) {
    http_response_code(500);
    echo 'Error: '.$e->getMessage();
}
