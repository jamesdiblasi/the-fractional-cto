import { ImageResponse } from 'next/og';
import { getSiteConfig } from '@/lib/config';
import { hero } from '@/lib/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const alt = 'The Fractional CTO';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#0a50ff',
              display: 'flex',
            }}
          />
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            {site.siteName}
          </span>
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
            {hero.headline}
          </span>
          <span style={{ fontSize: 28, color: '#6b6762', maxWidth: 900 }}>
            {hero.subheadline}
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
