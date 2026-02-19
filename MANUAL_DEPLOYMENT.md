# Manual Deployment Guide (No SSH Required)

## Method 1: Web-Based Deployment (Recommended)

### Initial Setup

1. **Upload Files via cPanel File Manager:**
   - Download your repository as ZIP from: https://github.com/jonothorne/youthsys/archive/refs/heads/main.zip
   - In cPanel File Manager, navigate to your web directory (usually `public_html`)
   - Upload the ZIP file
   - Extract it
   - Move all files from the `youthsys-main` folder to your web root

2. **Configure Environment:**
   - In File Manager, find `.env.production.example`
   - Right-click → Copy → Rename copy to `.env`
   - Right-click `.env` → Edit
   - Update these values:
     ```
     APP_ENV=production
     APP_DEBUG=false
     APP_URL=http://youth.alivechur.ch

     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_DATABASE=youthsys_db
     DB_USERNAME=your_db_username
     DB_PASSWORD=your_db_password
     ```
   - Save the file

3. **Set Deployment Password:**
   - Open `public/deploy.php` in File Manager editor
   - Find this line: `$DEPLOY_PASSWORD = 'change-me-to-something-secret';`
   - Change it to a strong password of your choice
   - Save the file

4. **Import Database:**
   - Open PHPMyAdmin
   - Select your database
   - Go to Import tab
   - Upload `database/mysql_export_safe.sql`
   - Click "Go"

5. **Run First Deployment:**
   - Visit: `http://youth.alivechur.ch/deploy.php?password=YOUR_PASSWORD`
   - (Replace YOUR_PASSWORD with what you set in step 3)
   - You should see deployment output
   - The site should now work!

6. **Delete deploy.php (Important!):**
   - Once deployment is successful, delete `public/deploy.php` for security

### Future Updates

When you push new code to GitHub:

1. Download latest ZIP from GitHub
2. Upload and extract to a temporary folder
3. Copy changed files to your web directory
4. Visit: `http://youth.alivechur.ch/deploy.php?password=YOUR_PASSWORD`

## Method 2: Completely Manual (If exec() is disabled)

If the web-based deployment doesn't work (server has exec() disabled):

### 1. Upload Files
- Download and extract repository ZIP
- Upload all files via cPanel File Manager

### 2. Configure .env
- Copy `.env.production.example` to `.env`
- Edit with your database credentials

### 3. Set Permissions
In File Manager, set these folders to 775 permissions:
- `storage` (and all subfolders)
- `bootstrap/cache`

Right-click folder → Change Permissions → Set to 775

### 4. Clear Caches Manually
Delete these folders' contents (keep the folders, just delete files inside):
- `bootstrap/cache/*.php` (except `.gitignore`)
- `storage/framework/cache/data/*`
- `storage/framework/sessions/*`
- `storage/framework/views/*`

### 5. Import Database
- Use PHPMyAdmin to import `database/mysql_export_safe.sql`

### 6. Test Site
- Visit your site and check if it works
- Check `storage/logs/laravel.log` for any errors

## Troubleshooting

### Blank Page
1. Check `.env` file exists and has correct database credentials
2. Check `storage/logs/laravel.log` for errors
3. Verify `public/build` folder exists with files

### 500 Error
1. Check file permissions on `storage/` and `bootstrap/cache/`
2. Ensure document root points to the `public/` folder
3. Check web server error logs in cPanel

### Assets Not Loading
1. Verify `public/build/` directory exists
2. Check `APP_URL` in `.env` matches your domain
3. Clear browser cache

### Database Errors
1. Verify database credentials in `.env`
2. Ensure database was imported successfully
3. Check database name matches in `.env` and cPanel

## File Checklist

After deployment, verify these exist:
- [ ] `.env` file (not .env.production.example)
- [ ] `public/build/` folder with CSS/JS files
- [ ] `bootstrap/ssr/` folder
- [ ] `storage/` folders are writable (775)
- [ ] Database is imported and populated

## Security Notes

- **DELETE `public/deploy.php` after successful deployment!**
- Never share your `.env` file
- Keep `APP_DEBUG=false` in production
- Use strong database passwords
