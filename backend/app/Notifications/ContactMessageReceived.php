<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactMessageReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public string $messageId) {}

    public function via(object $notifiable): array { return ['mail']; }

    public function toMail(object $notifiable): MailMessage
    {
        $message = ContactMessage::findOrFail($this->messageId);

        return (new MailMessage)
            ->subject('New portfolio contact message')
            ->replyTo($message->email, $message->full_name)
            ->line('A visitor submitted a new contact message.')
            ->line('Name: '.$message->full_name)
            ->line('Subject: '.$message->subject)
            ->line('Message: '.$message->message);
    }
}
