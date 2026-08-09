import Link from "next/link";

export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-1.5 font-mono text-lg font-semibold tracking-tight text-ink ${className}`}
    >
      <span className="text-brand-600">{"<"}</span>
      apiuikit
      <span className="text-brand-600">{"/>"}</span>
    </Link>
  );
}
