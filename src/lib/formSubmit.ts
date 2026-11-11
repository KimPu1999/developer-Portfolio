import type { ContactPayload } from '../types/api'

interface FormSubmitResponse {
  success?: boolean | string
  message?: string
}

function isAccepted(response: FormSubmitResponse) {
  return response.success === true || response.success === 'true'
}

export async function sendContactEmail(payload: ContactPayload, recipient: string) {
  if (!recipient.trim()) {
    throw new Error('Contact email is not configured yet.')
  }

  if (payload.website?.trim()) {
    throw new Error('The message could not be sent.')
  }

  let response: Response
  try {
    response = await fetch(`https://formsubmit.co/ajax/${recipient.trim()}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.full_name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim(),
        message: payload.message.trim(),
        _subject: `Portfolio contact: ${payload.subject.trim()}`,
        _honey: payload.website ?? '',
      }),
    })
  } catch {
    throw new Error('The email service is unavailable. Please try again later.')
  }

  const body = await response.json().catch(() => ({})) as FormSubmitResponse
  if (!response.ok || !isAccepted(body)) {
    throw new Error(body.message || 'The message could not be sent. Please try again later.')
  }

  return body
}
