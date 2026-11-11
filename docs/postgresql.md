# PostgreSQL production

Create a database and a least-privilege application role. Restrict network access to the Laravel host, require TLS when supported by the provider, and keep credentials in the host secret manager.

Migration procedure:

1. Take a verified backup.
2. Run `php artisan migrate --force`.
3. Check application health and queue processing.
4. Review query timing for the analytics and admin list endpoints.

The analytics event and project publication indexes are included in the migrations. Configure connection pooling through the host or a pooler when traffic requires it. Test restores regularly; a backup that has never been restored is not a recovery guarantee.
