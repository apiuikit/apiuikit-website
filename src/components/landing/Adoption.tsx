import Link from "next/link";

const GITHUB_URL = "https://github.com/AceTheCreator/apiuikit";

export default function Adoption() {
  return (
    // Its own top rule: the section before it has no bottom border, and every
    // section boundary on the page is a hairline.
    <section className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
          Getting it in
        </p>
        <div className="mt-4 max-w-4xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
          <h2 className="font-bold text-ink">Incremental, not all-or-nothing.</h2>
          <p className="text-ink-faint">
            Start with one endpoint in a page you already have. Add more when
            you need them.
          </p>
        </div>

        {/* Inline color, not text-white — see Header.tsx's CTA for why. */}
        <Link
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-3 text-sm font-medium transition-colors hover:bg-brand-700"
          style={{ color: "#ffffff" }}
        >
          Go to the repo
          {/* Matches the hero CTA's arrow. */}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8h11M9.5 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
