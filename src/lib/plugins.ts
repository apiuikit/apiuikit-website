import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderMarkdown, titleOf, withHeadingIds } from "./markdown";

const PLUGINS_DIR = path.join(process.cwd(), "src/content/plugins");

export type PluginStatus = "available" | "coming-soon";
export type PluginSpec = "openapi" | "asyncapi";

export interface PluginCatalogEntry {
  slug: string;
  name: string;
  status: PluginStatus;
  spec: PluginSpec;
  summary: string;
  packageName?: string;
  github?: string;
  npm?: string;
  coverImage?: string;
  coverAlt?: string;
  /** Published by the apiuikit team, not a third-party package. */
  official?: boolean;
}

/**
 * The published and upcoming plugins. Status, package links, and cover art
 * live here rather than in the markdown so the index can list a coming-soon
 * plugin that has no doc page yet.
 */
export const PLUGIN_CATALOG: PluginCatalogEntry[] = [
  {
    slug: "openapi-try-it",
    name: "OpenAPI Try it",
    status: "available",
    spec: "openapi",
    packageName: "@apiuikit/openapi-try-it-plugin",
    summary:
      "Fill in parameters, auth, and a body, send the request, and inspect the response — from the docs.",
    github: "https://github.com/apiuikit/openapi-try-it-plugin",
    npm: "https://www.npmjs.com/package/@apiuikit/openapi-try-it-plugin",
    coverImage: "/plugins/openapi-try-it/tab.png",
    coverAlt:
      "The Try it tab: request URL, parameters, auth, body, and Send",
    official: true,
  },
  {
    slug: "asyncapi",
    name: "AsyncAPI Try it",
    status: "coming-soon",
    spec: "asyncapi",
    summary:
      "A plugin for AsyncAPI operations. Same slot model as OpenAPI Try it; not published yet.",
    official: true,
  },
];

export function getPluginCatalog(): PluginCatalogEntry[] {
  return PLUGIN_CATALOG;
}

export function getPublishedPlugins(): PluginCatalogEntry[] {
  return PLUGIN_CATALOG.filter((plugin) => plugin.status === "available");
}

export function getPluginEntry(slug: string): PluginCatalogEntry | undefined {
  return PLUGIN_CATALOG.find((plugin) => plugin.slug === slug);
}

export async function getPluginDoc(slug: string) {
  const entry = getPluginEntry(slug);
  if (!entry || entry.status !== "available") return null;

  const markdown = await readFile(
    path.join(PLUGINS_DIR, `${slug}.md`),
    "utf8",
  );
  const withoutTitle = markdown.replace(/^#\s+.+$/m, "");
  const { html, headings } = withHeadingIds(await renderMarkdown(withoutTitle));

  return {
    ...entry,
    title: titleOf(markdown, entry.name),
    html,
    headings,
  };
}
