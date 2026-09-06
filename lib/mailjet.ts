/**
 * Thin wrapper over the Mailjet Send API v3.1.
 *
 * https://dev.mailjet.com/email/reference/send-emails/
 *
 * Credentials come from MAILJET_API_KEY and MAILJET_SECRET_KEY. The sender
 * (MAILJET_FROM_EMAIL) must be a validated sender or domain in the Mailjet
 * account or the API rejects the message.
 */

export interface MailAddress {
  email: string;
  name?: string;
}

export interface SendMailInput {
  to: MailAddress[];
  replyTo?: MailAddress;
  subject: string;
  text: string;
  html?: string;
}

export interface MailjetConfig {
  apiKey: string;
  secretKey: string;
  from: MailAddress;
}

export function getMailjetConfig(): MailjetConfig | null {
  const apiKey = process.env.MAILJET_API_KEY?.trim();
  const secretKey = process.env.MAILJET_SECRET_KEY?.trim();
  const fromEmail = process.env.MAILJET_FROM_EMAIL?.trim();
  if (!apiKey || !secretKey || !fromEmail) return null;
  return {
    apiKey,
    secretKey,
    from: {
      email: fromEmail,
      name: process.env.MAILJET_FROM_NAME?.trim() || 'The Fractional CTO',
    },
  };
}

export async function sendMail(
  config: MailjetConfig,
  input: SendMailInput,
): Promise<void> {
  const auth = Buffer.from(`${config.apiKey}:${config.secretKey}`).toString(
    'base64',
  );

  const message: Record<string, unknown> = {
    From: { Email: config.from.email, Name: config.from.name },
    To: input.to.map((a) => ({ Email: a.email, Name: a.name })),
    Subject: input.subject,
    TextPart: input.text,
  };
  if (input.html) message.HTMLPart = input.html;
  if (input.replyTo) {
    message.ReplyTo = { Email: input.replyTo.email, Name: input.replyTo.name };
  }

  const res = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Messages: [message] }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Mailjet ${res.status}: ${body.slice(0, 500)}`);
  }

  const json = (await res.json()) as {
    Messages?: { Status?: string; Errors?: { ErrorMessage?: string }[] }[];
  };
  const first = json.Messages?.[0];
  if (first && first.Status !== 'success') {
    const reason = first.Errors?.map((e) => e.ErrorMessage).join('; ');
    throw new Error(`Mailjet message not accepted: ${reason ?? first.Status}`);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
