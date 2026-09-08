import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getSiteConfig } from '@/lib/config';
import { hero } from '@/lib/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const alt = 'The Fractional CTO';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The lockup, inlined as a data URI because Satori cannot fetch relative
 * URLs. It reads public/logo-og.png rather than public/logo.png: the source
 * file carries a wide transparent margin that would shrink the logo inside
 * its box, and Satori does not decode WebP, so the site's logo.webp will not
 * do either. Read once per server start; a missing file falls back to the
 * site name in text rather than failing the whole card.
 */
const logo = (() => {
  try {
    const file = readFileSync(join(process.cwd(), 'public', 'logo-og.png'));
    return {
      src: `data:image/png;base64,${file.toString('base64')}`,
      width: 400,
      height: 58,
    };
  } catch {
    return null;
  }
})();

/** Headlines mark accent phrases with asterisks; Satori would print them. */
function plain(text: string) {
  return text.replace(/\*/g, '');
}

export default function OpenGraphImage() {
  const site = getSiteConfig();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#ffffff',
          color: '#0a0a0a',
          fontFamily: 'Figtree, Inter, Arial, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(10,80,255,0.45), rgba(10,80,255,0.12) 60%, transparent)',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={site.siteName}
              width={logo.width}
              height={logo.height}
            />
          ) : (
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
              {site.siteName}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              maxWidth: 980,
            }}
          >
            {plain(hero.headline)}
          </span>
          <span style={{ fontSize: 28, color: '#6b6762', maxWidth: 900 }}>
            {plain(hero.subheadline)}
          </span>
        </div>
        <span style={{ fontSize: 22, color: '#6b6762' }}>
          {site.siteUrl.replace(/^https?:\/\//, '')}
        </span>
      </div>
    ),
    size,
  );
}
