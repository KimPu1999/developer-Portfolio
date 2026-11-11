# Rollback plan

1. Stop the release promotion and preserve deployment, application and queue logs.
2. Repoint traffic to the last verified frontend and API versions using the provider's protected rollback action.
3. Do not reverse database migrations blindly. Review whether the migration is backward compatible and restore the database only when the incident requires it.
4. Restore PostgreSQL and published media from the latest known-good backups in an isolated environment.
5. Restart queue workers with the verified release and inspect failed jobs before resuming contact processing.
6. Run health, public project, contact and admin smoke tests.
7. Record the incident, affected version, data recovery point and follow-up remediation.

No rollback has been executed or verified in this local environment.
