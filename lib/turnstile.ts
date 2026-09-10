/**
 * Cloudflare Turnstile, the bot check on the booking form. Optional: with
 * no TURNSTILE_SECRET_KEY the check is skipped and the honeypot and rate
 * limit are all that stand in the way, which is fine until the calendar
 * starts filling with junk.
 *
 * The site key is public and reaches the panel through lib/config.ts; the
 * secret stays here.
 */

/** True when the token checks out, or when Turnstile is not configured. */
export async function verifyTurnstile(
  token: unknown,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true;
  if (typeof token !== 'string' || !token || token.length > 2048) return false;

  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    },
  );
  if (!res.ok) return false;
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}
