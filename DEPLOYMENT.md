# Production Deployment Guide

## Prerequisites

1. SSH access to your server
2. Git installed on server
3. Composer installed on server
4. PHP 8.2+ installed
5. MySQL database created

## Initial Setup (First Time Only)

### 1. Clone Repository on Server

SSH into your server and run:

```bash
cd ~/public_html  # or your web root directory
git clone https://github.com/jonothorne/youthsys.git .
```

### 2. Configure Environment

```bash
cp .env.production.example .env
nano .env  # or use vi/vim to edit
```

Update these values in `.env`:
- `APP_URL` - Your domain
- `DB_DATABASE` - Your database name
- `DB_USERNAME` - Your database username
- `DB_PASSWORD` - Your database password

### 3. Install Dependencies

```bash
composer install --optimize-autoloader --no-dev
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Set Permissions

```bash
chmod -R 775 storage bootstrap/cache
```

### 6. Import Database

Via PHPMyAdmin:
1. Select your database
2. Import `database/mysql_export_safe.sql`

Or via command line:
```bash
mysql -u your_username -p your_database < database/mysql_export_safe.sql
```

### 7. Run First Deployment

```bash
bash deploy.sh
```

## Regular Deployments (After Code Updates)

Simply SSH into your server and run:

```bash
cd ~/public_html  # or your web root directory
bash deploy.sh
```

This script will:
- Pull latest code from Git
- Install/update dependencies
- Clear caches
- Optimize for production
- Set correct permissions

## Alternative: Manual Deployment

If you prefer manual steps:

```bash
# 1. Pull code
git pull origin main

# 2. Install dependencies
composer install --optimize-autoloader --no-dev

# 3. Clear caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# 4. Optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Fix permissions
chmod -R 775 storage bootstrap/cache
```

## Troubleshooting

### Site shows blank page
- Check `storage/logs/laravel.log` for errors
- Verify `.env` file exists and has correct database credentials
- Ensure `APP_KEY` is set in `.env`
- Check file permissions on `storage/` and `bootstrap/cache/`

### 500 Error
- Check web server error logs
- Ensure `.htaccess` file exists in `public/` directory
- Verify document root points to `public/` folder

### Assets not loading
- Verify `public/build/` directory exists
- Check `APP_URL` in `.env` matches your domain
- Clear browser cache

### Database connection error
- Verify database credentials in `.env`
- Ensure database exists
- Check database server is running
- Test connection: `php artisan tinker` then `DB::connection()->getPdo();`

## Production Checklist

- [ ] `.env` file configured correctly
- [ ] `APP_ENV=production`
- [ ] `APP_DEBUG=false`
- [ ] Database imported
- [ ] File permissions set correctly
- [ ] Storage linked (`php artisan storage:link`)
- [ ] Caches cleared and optimized
- [ ] Site loads without errors

## Support

For issues, check:
1. `storage/logs/laravel.log`
2. Web server error logs
3. PHP error logs

## Security Notes

- Never commit `.env` file to Git
- Keep `APP_DEBUG=false` in production
- Regularly update dependencies: `composer update`
- Keep backups of database
