import Link from "next/link";
import Wordmark from "./Wordmark";

const GITHUB_URL = "https://github.com/AceTheCreator/apiuikit";
const NPM_URL = "https://www.npmjs.com/package/apiuikit";
const LICENSE_URL = "https://github.com/AceTheCreator/apiuikit/blob/master/LICENSE";

const links = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "npm", href: NPM_URL },
  { label: "Apache-2.0 license", href: LICENSE_URL },
];

export default function Footer() {
  return (
    <footer className="border-t border-chrome-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="text-sm text-ink-faint">
            React components for rendering AsyncAPI and OpenAPI documents.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
