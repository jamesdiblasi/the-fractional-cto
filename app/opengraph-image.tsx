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
          background: 'linear-gradient(135deg, #0a0d12 0%, #12161e 100%)',
          color: '#eef1f5',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: '3px solid #f59e0b',
              display: 'flex',
            }}
          />
          <span style={{ fontSize: 30, fontWeight: 600 }}>{site.siteName}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#f59e0b',
            }}
          >
            {hero.eyebrow}
          </span>
          <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
            {hero.headline}
          </span>
        </div>
        <span style={{ fontSize: 24, color: '#9aa3b2' }}>{site.siteUrl.replace(/^https?:\/\//, '')}</span>
      </div>
    ),
    size,
  );
}
