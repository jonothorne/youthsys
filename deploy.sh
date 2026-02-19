#!/bin/bash

# Laravel Production Deployment Script
# Run this on your production server via SSH

echo "======================================"
echo "🚀 Starting Laravel Deployment"
echo "======================================"

# Navigate to project directory (update this path if needed)
cd ~/public_html || exit

# Pull latest code
echo "📥 Pulling latest code from Git..."
git fetch origin
git reset --hard origin/main

# Install/Update Composer dependencies (production only, no dev)
echo "📦 Installing Composer dependencies..."
composer install --optimize-autoloader --no-dev

# Set correct permissions
echo "🔒 Setting file permissions..."
chmod -R 775 storage bootstrap/cache
find storage -type f -exec chmod 664 {} \;
find storage -type d -exec chmod 775 {} \;
find bootstrap/cache -type f -exec chmod 664 {} \;
find bootstrap/cache -type d -exec chmod 775 {} \;

# Clear all caches
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Optimize for production
echo "⚡ Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage link if it doesn't exist
echo "🔗 Creating storage symlink..."
php artisan storage:link 2>/dev/null || echo "Storage link already exists"

# Run migrations (optional - comment out if you don't want auto-migrations)
# echo "🗄️  Running database migrations..."
# php artisan migrate --force

echo "======================================"
echo "✅ Deployment Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Verify your .env file has correct settings"
echo "2. Check site is working: http://youth.alivechur.ch"
echo "3. Check logs if issues: storage/logs/laravel.log"
