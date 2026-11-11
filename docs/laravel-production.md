# Laravel production hosting

Use PHP 8.3 or newer with the extensions required by Laravel, PostgreSQL PDO, fileinfo, OpenSSL, Mbstring, XML, cURL and JSON. Point the web server document root at `backend/public`, never at the repository root.

Set `APP_ENV=production`, `APP_DEBUG=false`, a securely generated `APP_KEY`, `APP_URL`, `FRONTEND_URL`, `SANCTUM_STATEFUL_DOMAINS`, secure session cookie settings, database credentials, mail settings and `QUEUE_CONNECTION=database`.

Run a persistent queue worker with a process supervisor. Run the Laravel scheduler every minute using `php artisan schedule:run`, or use the hosting provider's scheduler. Retain application logs outside the public directory and monitor `failed_jobs`.
