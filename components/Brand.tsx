import Link from "next/link";

/** Infra Core wordmark + logo. `light` switches to the on-dark color treatment. */
export function Brand({ light }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand${light ? " brand--light" : ""}`} aria-label="Infra Core">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path d="M16 4l10.4 6v12L16 28 5.6 22V10L16 4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="16" cy="14.5" r="3" fill="currentColor" />
        </svg>
      </span>
      <span className="brand__text">
        Infra<span className="brand__accent">Core</span>
      </span>
    </Link>
  );
}
