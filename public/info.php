<?php
/**
 * Diagnostic file - shows current directory structure
 * Visit: http://youth.alivechur.ch/info.php
 * DELETE THIS FILE after checking!
 */

echo "<h1>Directory Diagnostic</h1>";

echo "<h2>Current Directory:</h2>";
echo "<pre>" . __DIR__ . "</pre>";

echo "<h2>Parent Directory:</h2>";
echo "<pre>" . dirname(__DIR__) . "</pre>";

echo "<h2>Files in Current Directory:</h2>";
echo "<pre>";
print_r(scandir(__DIR__));
echo "</pre>";

echo "<h2>Files in Parent Directory:</h2>";
echo "<pre>";
print_r(scandir(dirname(__DIR__)));
echo "</pre>";

echo "<h2>Laravel Check:</h2>";
if (file_exists(__DIR__ . '/../artisan')) {
    echo "✅ artisan file found - Laravel root is in parent directory<br>";
    echo "✅ This is correct! Document root is properly set to public/<br>";
} else {
    echo "❌ artisan file NOT found in parent directory<br>";
    echo "⚠️ Your document root may not be pointing to the public/ folder<br>";
}

echo "<h2>PHP Info:</h2>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
