# Production security

The API includes session-based Sanctum support, CSRF initialization, rate limiting, admin authorization, input validation, HTTPS-only URL validation, upload MIME/signature checks, generated storage names, safe text rendering, security headers and audit records.

Before production:

- Set `APP_DEBUG=false` and use HTTPS.
- Set secure, HTTP-only, same-site cookies and exact CORS origins.
- Verify CSP compatibility with the selected asset/font policy.
- Configure SMTP and queue failure monitoring.
- Run dependency audits and review all admin policies.
- Rotate credentials through the provider secret manager.
- Review data retention for messages, analytics and audit logs.

This checklist is not a penetration test or a security certification. No penetration test is claimed.
