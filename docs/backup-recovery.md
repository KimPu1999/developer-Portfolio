# Backup and recovery

Schedule daily encrypted PostgreSQL backups with a retention period chosen for the project. Store copies offsite and restrict access to the backup role. Include explicitly published media storage in the backup plan.

Recovery procedure:

1. Isolate the affected application and preserve relevant logs.
2. Provision a clean database host.
3. Restore the latest known-good backup.
4. Apply only reviewed migrations.
5. Verify health, admin login, public projects, contact persistence and queue processing.
6. Reconnect traffic after a controlled smoke test.

Restore testing must be scheduled and recorded. No backup creation or restoration has been verified in this environment.
