# Domain and HTTPS

Choose the frontend and API hosting providers first. Each provider supplies the authoritative DNS records and verification values; obtain those values from the provider dashboard rather than copying examples.

Configure the final domain set:

- `yourdomain.com` and `www.yourdomain.com` for the frontend
- `api.yourdomain.com` for Laravel

After DNS verification, enable provider-managed certificates, redirect HTTP to HTTPS, set the canonical frontend domain, and configure Laravel with the exact HTTPS frontend origin. Set `SESSION_SECURE_COOKIE=true`, a deliberate `SESSION_DOMAIN`, `SESSION_SAME_SITE`, and the matching Sanctum stateful domains. Verify CSRF initialization from the frontend before enabling admin access.
