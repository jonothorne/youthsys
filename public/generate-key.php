<?php
/**
 * Generate Laravel APP_KEY
 * Visit: http://youth.alivechur.ch/generate-key.php
 * DELETE THIS FILE after use!
 */

// Generate a random 32-byte key
$key = 'base64:' . base64_encode(random_bytes(32));

echo "<h1>Laravel APP_KEY Generator</h1>";
echo "<h2>Your new APP_KEY:</h2>";
echo "<pre style='background: #f5f5f5; padding: 15px; border: 1px solid #ddd;'>";
echo $key;
echo "</pre>";

echo "<h3>Instructions:</h3>";
echo "<ol>";
echo "<li>Copy the key above</li>";
echo "<li>Open your .env file in cPanel File Manager</li>";
echo "<li>Find the line: <code>APP_KEY=</code></li>";
echo "<li>Replace it with: <code>APP_KEY=" . htmlspecialchars($key) . "</code></li>";
echo "<li>Save the .env file</li>";
echo "<li><strong>DELETE THIS FILE (generate-key.php)</strong></li>";
echo "<li>Refresh your site</li>";
echo "</ol>";
