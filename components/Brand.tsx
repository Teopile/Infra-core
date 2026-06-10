import Link from "next/link";

/* The InfraCore mark: hexagonal pinwheel of circuit traces in the four
   brand greens (SVG recreation of the supplied logo, so it carries no
   baked-in background and stays crisp at every size). */
const TRACE_COLORS = ["#0b6854", "#bce0d7", "#309076", "#6eb39f", "#0b6854", "#6eb39f"];

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {TRACE_COLORS.map((color, i) => (
        <g key={i} transform={`rotate(${i * 60} 32 32)`}>
          <path
            d="M32 25 V14 L24.5 8.5"
            fill="none"
            stroke={color}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24.5" cy="8.5" r="3" fill={color} />
        </g>
      ))}
    </svg>
  );
}

/** Logo lockup: mark + two-tone wordmark, links to home. */
export function Brand({ light }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand${light ? " brand--light" : ""}`} aria-label="InfraCore">
      <span className="brand__mark">
        <BrandMark />
      </span>
      <span className="brand__text">
        <span className="brand__infra">Infra</span>
        <span className="brand__core">Core</span>
      </span>
    </Link>
  );
}
