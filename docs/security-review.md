# Phase 6 security review

## Verified by source review

- Admin API routes use Sanctum session authentication and an admin authorization middleware.
- Contact, login and analytics routes have explicit rate limiters.
- Contact submissions use server-side validation, a honeypot field, duplicate suppression and an HMAC IP hash.
- Eloquent/query builder usage is used for database access; no raw user input is interpolated into SQL.
- Project and social URLs restrict schemes to HTTPS or the explicitly supported mail scheme.
- Uploads restrict extensions, MIME values and size, generate UUID storage names, and separate public/private disks.
- Security headers include `nosniff`, frame protection, referrer policy, permissions policy and production HSTS.
- Public project queries filter unpublished records.
- Message bodies are rendered as text in the admin UI; raw HTML injection was not found in frontend source.

## Findings and limitations

- **Blocked:** dependency vulnerability audit and runtime authorization tests until Composer dependencies are installed.
- **Not tested:** penetration testing, external scanning, mail provider security, object storage policy and production proxy behavior.
- **Medium risk:** uploaded images are MIME/size validated but are not re-encoded or virus scanned. Add provider-side malware scanning and image normalization before accepting untrusted public uploads at scale.
- **Operational requirement:** set `APP_DEBUG=false`, secure cookies, exact CORS/stateful domains, HTTPS and managed secrets before production.

This review is not a penetration test or security certification.
