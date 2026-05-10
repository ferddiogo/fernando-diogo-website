type Props = { size?: number; className?: string };

export function LogoMark({ size = 42, className }: Props) {
  const cell = size / 4.7;
  const gap = cell * 0.22;
  const grid = [
    [1, 0.55, 1, 0.3],
    [0.55, 'accent', 0.55, 1],
    [1, 0.3, 0.55, 1],
    [0.3, 1, 1, 0.55],
  ] as const;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Fernando Diogo"
    >
      {grid.map((row, r) =>
        row.map((value, c) => {
          const x = c * (cell + gap);
          const y = r * (cell + gap);
          if (value === 'accent') {
            return <rect key={`${r}-${c}`} x={x} y={y} width={cell} height={cell} fill="var(--accent)" />;
          }
          return (
            <rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width={cell}
              height={cell}
              fill="var(--steel)"
              opacity={value as number}
            />
          );
        }),
      )}
    </svg>
  );
}
