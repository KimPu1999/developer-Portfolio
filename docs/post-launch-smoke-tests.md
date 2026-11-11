# Post-launch smoke tests

Run only with authorized test data and a dedicated test contact address.

```bash
curl -fsS https://api.example.invalid/api/health
curl -fsS https://api.example.invalid/api/v1/projects
curl -fsS https://www.example.invalid/
```

Then verify in the browser:

- Homepage, project listing and one project detail load over HTTPS.
- Contact validation and one controlled submission work; remove the test message afterward.
- Notification appears in the configured test inbox or queue failure is visible.
- Admin login, dashboard and logout work.
- Draft projects remain absent from public responses.
- No critical application or queue errors appear in logs.
- HTTPS redirect, canonical domain, robots and sitemap behave as expected.

No post-launch checks have been run because no production deployment exists.
