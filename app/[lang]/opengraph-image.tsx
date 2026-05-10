import { ImageResponse } from 'next/og';

export const alt = 'Fernando Diogo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const tagline = lang === 'en'
    ? 'ARCHITECTURE · REAL ESTATE INTELLIGENCE'
    : 'ARQUITETURA · INTELIGÊNCIA IMOBILIÁRIA';

  // Build the 4x4 grid mark using rectangles
  const cellSize = 36;
  const gap = 8;
  const gridX = 80;
  const gridY = 80;

  // grid[r][c] = opacity (0-1) or 'accent' for the orange cell
  const grid: ReadonlyArray<ReadonlyArray<number | 'accent'>> = [
    [1, 0.55, 1, 0.3],
    [0.55, 'accent', 0.55, 1],
    [1, 0.3, 0.55, 1],
    [0.3, 1, 1, 0.55],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#F5F2ED',
          padding: '80px',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* 4×4 grid mark — absolutely positioned in top-left */}
        {grid.map((row, r) =>
          row.map((value, c) => {
            const x = gridX + c * (cellSize + gap);
            const y = gridY + r * (cellSize + gap);
            const isAccent = value === 'accent';
            const fill = isAccent
              ? '#FF6B35'
              : `rgba(15, 30, 61, ${value as number})`;
            return (
              <div
                key={`${r}-${c}`}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: cellSize,
                  height: cellSize,
                  background: fill,
                }}
              />
            );
          }),
        )}

        {/* Bottom block: wordmark + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            FERNANDO DIOGO
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#6B6B6B',
              marginTop: 16,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
