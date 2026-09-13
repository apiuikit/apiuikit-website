import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DocsToc from "@/components/docs/DocsToc";
import GitHubIcon from "@/components/site/GitHubIcon";
import JsonLd from "@/components/site/JsonLd";
import NpmIcon from "@/components/site/NpmIcon";
import { getPluginDoc, getPublishedPlugins } from "@/lib/plugins";
import { SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return getPublishedPlugins().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/plugins/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const plugin = await getPluginDoc(slug);
  if (!plugin) return {};

  return {
    title: `${plugin.name} | apiuikit plugins`,
    description: plugin.summary,
    alternates: { canonical: `/plugins/${slug}` },
    openGraph: {
      title: `${plugin.name} | apiuikit plugins`,
      description: plugin.summary,
      url: `/plugins/${slug}`,
      type: "article",
    },
    twitter: {
      title: `${plugin.name} | apiuikit plugins`,
      description: plugin.summary,
    },
  };
}

export default async function PluginPage({
  params,
}: PageProps<"/plugins/[slug]">) {
  const { slug } = await params;
  const plugin = await getPluginDoc(slug);
  if (!plugin) notFound();

  const { name, html, headings, packageName, npm, github } = plugin;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Plugins",
        item: `${SITE_URL}/plugins`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: `${SITE_URL}/plugins/${slug}`,
      },
    ],
  };

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_13rem] xl:items-start">
      <JsonLd data={breadcrumbJsonLd} />
      <article className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
          Plugin
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
          {name}
        </h1>
        {(packageName || npm || github) && (
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
            {packageName && (
              <span className="font-mono text-ink-muted">{packageName}</span>
            )}
            {npm && (
              <Link
                href={npm}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${packageName ?? name} on npm`}
              >
                <span className="inline-flex text-ink-faint transition-colors hover:text-ink">
                  <NpmIcon className="h-4 w-4" />
                </span>
              </Link>
            )}
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${packageName ?? name} on GitHub`}
              >
                <span className="inline-flex text-ink-faint transition-colors hover:text-ink">
                  <GitHubIcon className="h-4 w-4" />
                </span>
              </Link>
            )}
          </p>
        )}

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

        <div
          className="docs-prose prose prose-slate mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-pre:bg-transparent prose-pre:p-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {headings.length > 0 && (
        <aside className="max-xl:hidden xl:sticky xl:top-24 xl:max-h-[calc(100vh-8rem)] xl:self-start xl:overflow-y-auto">
          <DocsToc headings={headings} />
        </aside>
      )}
    </div>
  );
}
