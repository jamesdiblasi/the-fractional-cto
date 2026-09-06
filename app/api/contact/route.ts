import { NextResponse } from 'next/server';
import { getMailjetConfig, sendMail, escapeHtml } from '@/lib/mailjet';
import { cleanText, isEmail, rateLimited, clientKey } from '@/lib/validate';
import { getSiteConfig } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Contact form. Emails the enquiry to CONTACT_TO_EMAIL (falls back to
 * CONTACT_EMAIL) with reply-to set to the sender, so a reply from the inbox
 * goes straight back to them.
 */
export async function POST(req: Request) {
  const site = getSiteConfig();
  if (!site.contactFormEnabled) {
    return NextResponse.json({ error: 'Form is disabled.' }, { status: 404 });
  }
  if (rateLimited(`contact:${clientKey(req)}`)) {
    return NextResponse.json(
      { error: 'Too many messages from this address. Please try again later.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real people never see this field.
  if (cleanText(body.website, 10)) {
    return NextResponse.json({ ok: true });
  }

  const name = cleanText(body.name, 120);
  const company = cleanText(body.company, 120);
  const email = cleanText(body.email, 254);
  const interest = cleanText(body.interest, 80);
  const message =
    typeof body.message === 'string' ? body.message.trim().slice(0, 4000) : '';

  if (!name || !isEmail(email) || !message) {
    return NextResponse.json(
      { error: 'Please add your name, a valid email and a message.' },
      { status: 400 },
    );
  }

  const mailjet = getMailjetConfig();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.contactEmail;
  if (!mailjet) {
    // Deliberately loud in the logs, soft to the visitor. Without Mailjet
    // configured the form cannot deliver, and the visitor has the email
    // address on the page as a fallback.
    console.error('[contact] Mailjet is not configured; enquiry dropped', {
      name,
      email,
      company,
    });
    return NextResponse.json(
      { error: `The form is not set up yet. Please email ${to} directly.` },
      { status: 503 },
    );
  }

  const subject = `Enquiry from ${name}${company ? ` (${company})` : ''}: ${interest || 'General'}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '-'}`,
    `Interest: ${interest || '-'}`,
    '',
    message,
  ].join('\n');
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
    <strong>Email:</strong> ${escapeHtml(email)}<br/>
    <strong>Company:</strong> ${escapeHtml(company || '-')}<br/>
    <strong>Interest:</strong> ${escapeHtml(interest || '-')}</p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    await sendMail(mailjet, {
      to: [{ email: to }],
      replyTo: { email, name },
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error('[contact] send failed', err);
    return NextResponse.json(
      { error: `Could not send right now. Please email ${to} directly.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
