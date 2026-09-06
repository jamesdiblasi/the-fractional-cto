import { NextResponse } from 'next/server';
import { getMailjetConfig, sendMail, escapeHtml } from '@/lib/mailjet';
import { cleanText, isEmail, rateLimited, clientKey } from '@/lib/validate';
import { getSiteConfig } from '@/lib/config';
import { leadMagnet } from '@/lib/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Lead magnet. Emails the visitor a link to the checklist PDF and sends the
 * owner a one-line notification. The response also carries the PDF URL so
 * the page can offer an immediate download whether or not email is set up.
 */
export async function POST(req: Request) {
  const site = getSiteConfig();
  if (!site.leadMagnetEnabled) {
    return NextResponse.json({ error: 'Not available.' }, { status: 404 });
  }
  if (rateLimited(`checklist:${clientKey(req)}`)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const url = `${site.siteUrl}${leadMagnet.file}`;

  if (cleanText(body.website, 10)) {
    return NextResponse.json({ ok: true, url });
  }

  const email = cleanText(body.email, 254);
  const name = cleanText(body.name, 80);
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const mailjet = getMailjetConfig();
  if (!mailjet) {
    console.error('[checklist] Mailjet is not configured; sending download link only', {
      email,
      name,
    });
    return NextResponse.json({ ok: true, url, emailed: false });
  }

  const greeting = name ? `Hi ${name},` : 'Hi,';
  const text = [
    greeting,
    '',
    `Here is ${leadMagnet.title}: ${url}`,
    '',
    'If any of the twenty questions gave you pause, reply to this email and tell me which one. Happy to point you in the right direction, no strings.',
    '',
    site.siteName,
    site.siteUrl,
  ].join('\n');
  const html = `
    <p>${escapeHtml(greeting)}</p>
    <p>Here is <strong>${escapeHtml(leadMagnet.title)}</strong>:<br/>
    <a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>
    <p>If any of the twenty questions gave you pause, reply to this email and tell me which one. Happy to point you in the right direction, no strings.</p>
    <p>${escapeHtml(site.siteName)}<br/><a href="${escapeHtml(site.siteUrl)}">${escapeHtml(site.siteUrl)}</a></p>
  `;

  const owner = process.env.CONTACT_TO_EMAIL?.trim() || site.contactEmail;

  const results = await Promise.allSettled([
    sendMail(mailjet, {
      to: [{ email, name: name || undefined }],
      replyTo: { email: owner, name: site.siteName },
      subject: leadMagnet.title,
      text,
      html,
    }),
    sendMail(mailjet, {
      to: [{ email: owner }],
      subject: `Checklist download: ${email}`,
      text: `${name || 'Someone'} <${email}> requested ${leadMagnet.title}.`,
    }),
  ]);

  const visitorSend = results[0];
  if (visitorSend.status === 'rejected') {
    console.error('[checklist] visitor email failed', visitorSend.reason);
    // The PDF link still goes back to the page; the visitor is not blocked
    // by a mail problem on our side.
    return NextResponse.json({ ok: true, url, emailed: false });
  }
  if (results[1].status === 'rejected') {
    console.error('[checklist] owner notification failed', results[1].reason);
  }

  return NextResponse.json({ ok: true, url, emailed: true });
}
