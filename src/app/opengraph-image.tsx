import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Yourent — Location de voitures à Casablanca, Maroc';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              color: '#C9A84C',
            }}
          >
            YOURENT
          </div>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 700,
              color: '#F5F0E8',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.2,
            }}
          >
            Location de voitures à Casablanca
          </div>
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(245,240,232,0.6)',
              textAlign: 'center',
              maxWidth: '700px',
            }}
          >
            Berlines · SUV · Voitures de luxe — Réservation en ligne
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '16px',
            color: 'rgba(201,168,76,0.7)',
            letterSpacing: '0.15em',
          }}
        >
          yourent.ma
        </div>
      </div>
    ),
    { ...size },
  );
}
