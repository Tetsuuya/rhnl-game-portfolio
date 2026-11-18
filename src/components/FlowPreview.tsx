// Clean theme-adaptive architecture preview when no screenshot or gameplay clip is attached.
export default function FlowPreview({ nodes }: { nodes: string[] }) {
  const gap = 156;
  const size = 54;
  const width = nodes.length * gap;
  const height = 160;
  const y = 44;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      role="img"
      aria-label={`Architecture: ${nodes.join(" → ")}`}
    >
      <rect width={width} height={height} fill="var(--surface-elevated)" />
      {nodes.map((label, i) => {
        const x = i * gap + (gap - size) / 2;
        const isEntry = i === 0;
        return (
          <g key={`${label}-${i}`}>
            {i < nodes.length - 1 && (
              <path
                d={`M ${x + size} ${y + size / 2} C ${x + size + 28} ${y + size / 2}, ${x + gap - 28} ${y + size / 2}, ${x + gap} ${y + size / 2}`}
                stroke="var(--line-strong)"
                strokeWidth="2"
                fill="none"
              />
            )}
            <rect
              x={x}
              y={y}
              width={size}
              height={size}
              rx={12}
              fill="var(--surface)"
              stroke={isEntry ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth="2"
            />
            <text
              x={x + size / 2}
              y={y + size / 2 + 6}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill={isEntry ? "var(--accent)" : "var(--ink)"}
            >
              {label.charAt(0)}
            </text>
            <text
              x={x + size / 2}
              y={y + size + 24}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="600"
              fill="var(--ink-soft)"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
