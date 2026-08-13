import Link from "next/link";
import Wordmark from "./Wordmark";
import GitHubIcon from "./GitHubIcon";

const GITHUB_URL = "https://github.com/AceTheCreator/apiuikit";
const NPM_URL = "https://www.npmjs.com/package/apiuikit";
const LICENSE_URL =
  "https://github.com/AceTheCreator/apiuikit/blob/master/LICENSE";
const PLAYGROUND_URL = "https://playground.apiuikit.com";

const columns = [
  {
    heading: "Project",
    links: [
      { label: "GitHub", href: GITHUB_URL },
      { label: "npm", href: NPM_URL },
      { label: "Apache-2.0 license", href: LICENSE_URL },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Playground", href: PLAYGROUND_URL },
      { label: "Components", href: "/#operations" },
      { label: "Live demo", href: "/#demo" },
    ],
  },
];

export default function Footer() {
  // Server component, so this is baked at build time rather than drifting
  // between server and client renders.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 py-14 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm text-ink-faint">
              React components for rendering AsyncAPI and OpenAPI documents.
            </p>
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="apiuikit on GitHub"
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border text-ink-muted transition-colors hover:text-ink hover:bg-chrome-surface"
            >
              <GitHubIcon />
            </Link>
          </div>

          {columns.map(({ heading, links }) => (
            <div key={heading}>
              {/* Same eyebrow treatment as the landing sections. */}
              <p className="text-xs font-medium tracking-wide text-ink-faint uppercase">
                {heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                {links.map(({ label, href }) => {
                  // In-page anchors stay in this tab; anything off-site opens
                  // in a new one.
                  const isExternal = href.startsWith("http");
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-ink-muted transition-colors hover:text-ink"
                        {...(isExternal && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-chrome-border py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Released under the Apache-2.0 license.</p>
          <p>© {year} apiuikit</p>
        </div>
      </div>
    </footer>
  );
}
