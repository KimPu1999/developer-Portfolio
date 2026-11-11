<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ProvisionAdminCommand extends Command
{
    protected $signature = 'portfolio:provision-admin {email} {--name=}';
    protected $description = 'Create or promote the administrator account without storing credentials in source.';

    public function handle(): int
    {
        $email = strtolower(trim((string) $this->argument('email')));
        $name = (string) ($this->option('name') ?: $this->ask('Admin name'));
        $password = $this->secret('Admin password (12+ characters)');
        if (! is_string($password) || strlen($password) < 12) {
            $this->error('The password must contain at least 12 characters.');
            return self::FAILURE;
        }

        User::query()->updateOrCreate(['email' => $email], ['name' => $name, 'password' => $password, 'is_admin' => true]);
        $this->info('Administrator provisioned for '.$email.'.');
        return self::SUCCESS;
    }
}
