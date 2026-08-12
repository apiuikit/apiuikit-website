import Link from "next/link";
import type { Metadata } from "next";
import { getDocList } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Docs | apiuikit",
  description:
    "Usage guides for apiuikit: composable sections, parser and no-parser entry points, OpenAPI, Avro and Protobuf payloads, Markdown export, and web components.",
};

export default async function DocsIndexPage() {
  const docs = await getDocList();

  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
        Documentation
      </p>
      {/* The landing page's type pattern: one size, split by weight and colour. */}
      <div className="mt-4 max-w-3xl font-display text-3xl leading-[1.25] tracking-tight text-pretty sm:text-4xl">
        <h1 className="font-bold text-ink">Usage guides.</h1>
        <p className="text-ink-faint">
          How to render a document, compose sections yourself, and handle the
          payload formats and entry points apiuikit supports.
        </p>
      </div>

      <ul className="mt-12 divide-y divide-chrome-border border-y border-chrome-border">
        {docs.map(({ slug, title, summary }) => (
          <li key={slug}>
            <Link
              href={`/docs/${slug}`}
              className="group block py-5 transition-colors hover:bg-chrome-surface"
            >
              <p className="font-medium text-ink">{title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-ink-faint">
                {summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
