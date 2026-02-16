<?php
use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Kernel::class);

try {
    $kernel->call('migrate', ['--force' => true]);
    echo "Migrations complete\n";
} catch (Exception $e) {
    http_response_code(500);
    echo 'Error: '.$e->getMessage();
}
