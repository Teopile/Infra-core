import Link from "next/link";

/** Wordmark: orange registration square + expanded Archivo lockup. */
export function Brand({ light }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand${light ? " brand--light" : ""}`} aria-label="Infra Core">
      <span className="brand__mark" aria-hidden="true" />
      <span className="brand__text">Infra Core</span>
    </Link>
  );
}
