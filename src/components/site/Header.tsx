import Link from "next/link";
import Wordmark from "./Wordmark";
import ThemeToggle from "./ThemeToggle";
import GitHubIcon from "./GitHubIcon";

const GITHUB_URL = "https://github.com/AceTheCreator/apiuikit";
const NPM_URL = "https://www.npmjs.com/package/apiuikit";
const PLAYGROUND_URL = "https://playground.apiuikit.com";

const sectionLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/#operations" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-chrome-border bg-chrome-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-6">
          <Wordmark />
          {/* In-page jumps, dropped on small screens where the CTA and icons
              already fill the bar. */}
          <nav className="flex items-center gap-1 text-sm max-md:hidden">
            {sectionLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-ink-muted transition-colors hover:text-ink hover:bg-chrome-surface"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <nav className="flex items-center gap-1">
          {/* Playground moved here as a text link now that the CTA slot
              belongs to GitHub. */}
          <Link
            href={PLAYGROUND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink hover:bg-chrome-surface max-sm:hidden"
          >
            Playground
          </Link>
          <Link
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink hover:bg-chrome-surface max-sm:hidden"
          >
            npm
          </Link>
          <ThemeToggle />

          <span aria-hidden className="mx-2 h-5 w-px bg-chrome-border" />

          {/* Inline color, not text-white: apiuikit/style.css sets a plain,
              unlayered `a { color: inherit }` rule, which beats any
              Tailwind utility class (Tailwind utilities live in @layer,
              and unlayered CSS always wins regardless of specificity).
              Inline style is the one thing that reliably wins here. */}
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-700"
            style={{ color: "#ffffff" }}
          >
            <GitHubIcon className="h-4 w-4" />
            {/* The label shortens rather than disappearing on small screens,
                so the button never becomes a bare unlabelled icon. */}
            <span className="max-sm:hidden">Star on GitHub</span>
            <span className="sm:hidden">Star</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
