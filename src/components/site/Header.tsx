import Link from "next/link";
import Wordmark from "./Wordmark";
import ThemeToggle from "./ThemeToggle";

const GITHUB_URL = "https://github.com/AceTheCreator/apiuikit";
const NPM_URL = "https://www.npmjs.com/package/apiuikit";
const PLAYGROUND_URL = "https://playground.apiuikit.com";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-chrome-border bg-chrome-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Wordmark />
        <nav className="flex items-center gap-2 text-sm text-ink-muted">
          <Link href={NPM_URL} className="hidden px-2 hover:text-ink sm:inline">
            npm
          </Link>
          <Link href={GITHUB_URL} className="hidden px-2 hover:text-ink sm:inline">
            GitHub
          </Link>
          <ThemeToggle />
          {/* Inline color, not text-white: apiuikit/style.css sets a plain,
              unlayered `a { color: inherit }` rule, which beats any
              Tailwind utility class (Tailwind utilities live in @layer,
              and unlayered CSS always wins regardless of specificity).
              Inline style is the one thing that reliably wins here. */}
          <Link
            href={PLAYGROUND_URL}
            className="ml-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-brand-700"
            style={{ color: "#ffffff" }}
          >
            Try it out
          </Link>
        </nav>
      </div>
    </header>
  );
}
