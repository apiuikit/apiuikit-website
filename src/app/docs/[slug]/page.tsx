import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DocsToc from "@/components/docs/DocsToc";
import { getDoc, getDocSlugs, getDocList } from "@/lib/docs";

export async function generateStaticParams() {
  const slugs = await getDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const slugs = await getDocSlugs();
  if (!slugs.includes(slug)) return {};

  const { title, summary } = await getDoc(slug);
  return { title: `${title} | apiuikit docs`, description: summary };
}

export default async function DocPage({ params }: PageProps<"/docs/[slug]">) {
  const { slug } = await params;
  const slugs = await getDocSlugs();
  if (!slugs.includes(slug)) notFound();

  const { title, html, headings } = await getDoc(slug);
  const docs = await getDocList();
  const index = docs.findIndex((doc) => doc.slug === slug);
  const previous = docs[index - 1];
  const next = docs[index + 1];

  return (
    // The TOC only earns its column from xl up; below that it would squeeze
    // the prose measure, so it renders above the body instead.
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_13rem] xl:items-start">
      <article className="min-w-0">
        <h1 className="font-display text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
          {title}
        </h1>

        {headings.length > 0 && (
          <details className="mt-6 rounded-lg border border-chrome-border p-4 xl:hidden">
            <summary className="cursor-pointer text-sm font-medium text-ink">
              On this page
            </summary>
            <div className="mt-3">
              <DocsToc headings={headings} />
            </div>
          </details>
        )}

        {/* docs-prose carries the unlayered link colours (globals.css); the
            prose-* modifiers pull headings and inline code onto the site's own
            tokens instead of the plugin's defaults. scroll-mt clears the
            sticky site header when a TOC entry jumps to a heading. */}
        <div
          // No prose-pre colour overrides: shiki owns the code block's
          // palette now, styled in globals.css under .docs-prose .shiki.
          className="docs-prose prose prose-slate mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-pre:bg-transparent prose-pre:p-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />

      {(previous || next) && (
        <nav className="mt-16 grid gap-4 border-t border-chrome-border pt-8 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/docs/${previous.slug}`}
              className="rounded-lg border border-chrome-border px-4 py-3 transition-colors hover:bg-chrome-surface"
            >
              <span className="block text-xs text-ink-faint">Previous</span>
              <span className="mt-0.5 block text-sm font-medium text-ink">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/docs/${next.slug}`}
              className="rounded-lg border border-chrome-border px-4 py-3 transition-colors hover:bg-chrome-surface sm:text-right"
            >
              <span className="block text-xs text-ink-faint">Next</span>
              <span className="mt-0.5 block text-sm font-medium text-ink">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
      </article>

      {headings.length > 0 && (
        // The sticky lives here, on the grid item, not on the nav inside it:
        // a sticky element travels within its parent's box, and the nav's
        // parent is only as tall as the nav. As a grid item with self-start,
        // this box spans the row — the full height of the article beside it —
        // so there's actually somewhere to stick.
        //
        // max-xl:hidden rather than a base+variant display pair: one utility
        // utility with no base class competing against it, so it can't be
        // outranked by the same-named utility in apiuikit's own Tailwind build.
        <aside className="max-xl:hidden xl:sticky xl:top-24 xl:max-h-[calc(100vh-8rem)] xl:self-start xl:overflow-y-auto">
          <DocsToc headings={headings} />
        </aside>
      )}
    </div>
  );
}
