import Link from "next/link";

const GITHUB_URL = "https://github.com/AceTheCreator/apiuikit";

const points = [
  {
    title: "Drop into an existing page",
    description:
      "No rewrite required: render one section standalone inside a page you already have, then add more as you need them.",
  },
  {
    title: "Not just React",
    description:
      "@apiuikit/web-component bundles React internally and exposes plain custom elements for Vue, Angular, Svelte, or vanilla HTML.",
  },
  {
    title: "Full TypeScript support",
    description:
      "Every component, config option, and helper is fully typed, including the AsyncAPI and OpenAPI document shapes themselves.",
  },
];

export default function Adoption() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-brand-600">Adoption made easy</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Incremental, not all-or-nothing
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {points.map((point) => (
          <div key={point.title}>
            <h3 className="text-sm font-medium text-ink">{point.title}</h3>
            <p className="mt-2 text-sm text-ink-faint">{point.description}</p>
          </div>
        ))}
      </div>

      {/* Inline color, not text-white — see Header.tsx's CTA for why. */}
      <Link
        href={GITHUB_URL}
        className="mt-12 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-brand-700"
        style={{ color: "#ffffff" }}
      >
        Go to the repo →
      </Link>
    </section>
  );
}
