import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
  renderMarkdown,
  summaryOf,
  titleOf,
  withHeadingIds,
  type MarkdownHeading,
} from "./markdown";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");

/**
 * Reading order, not alphabetical: someone landing on /docs should meet the
 * entry points before the format-specific pages. Any file not listed here
 * still renders, appended in directory order.
 */
const ORDER = [
  "getting-started",
  "cli",
  "configuration",
  "no-parser",
  "with-parser",
  "deep-linking",
  "sections",
  "plugins",
  "extensions",
  "avro",
  "protobuf",
  "ai-export",
  "with-webcomponents",
];

/**
 * Card copy for the index, written for that job. The fallback is a page's
 * first paragraph, which is written to open a page rather than to describe
 * one: it trails into whatever follows it, and some pages reasonably open by
 * naming a different component. Keyed by slug; anything unlisted still falls
 * back.
 */
const SUMMARIES: Record<string, string> = {
  "getting-started":
    "Install it, render your first document, and drop a single section into a page you already have.",
  cli: "Generate a static documentation site from a spec file in one command, with no frontend toolchain: every command, flag, and CI recipe.",
  configuration:
    "Every option on the config object: which sections to show, what starts expanded, theming, side-panel containment, host-page offsets, and Markdown output.",
  "no-parser":
    "For documents you already hold as an object. AsyncAPI and OpenAPI components, their props, and what each one renders.",
  "with-parser":
    "For raw YAML or JSON strings. The renderer components and imperative helpers, with parse diagnostics separate from render errors.",
  "deep-linking":
    "Open the docs on a specific endpoint, schema, or message, and keep the address bar in sync as people click around.",
  sections:
    "Render one section on its own, or arrange several under a shared provider, for both AsyncAPI and OpenAPI.",
  plugins:
    "Add your own UI to a rendered document from a separately-installed package — a \"Try it\" tab, an inline action, and how to write and publish one.",
  extensions:
    "The x-* fields apiuikit recognises, where each one appears, and how to switch them all off.",
  avro: "Rendering Avro payloads: the schemaFormat values recognised, and what a document needs to carry.",
  protobuf:
    "Rendering Protobuf payloads: the schemaFormat values recognised, and what a document needs to carry.",
  "ai-export":
    "Make your docs readable by agents and crawlers: the copy button, hosted Markdown URLs, and build-time file generation.",
  "with-webcomponents":
    "Use apiuikit from Vue, Angular, Svelte, or plain HTML through full-document and section custom elements.",
};

export interface DocMeta {
  slug: string;
  title: string;
  /** First paragraph, used as the card blurb on the index. */
  summary: string;
}

export type DocHeading = MarkdownHeading;

function slugOf(filename: string) {
  return filename.replace(/\.md$/, "");
}

async function readDoc(slug: string) {
  return readFile(path.join(DOCS_DIR, `${slug}.md`), "utf8");
}

export async function getDocSlugs(): Promise<string[]> {
  const files = (await readdir(DOCS_DIR)).filter((f) => f.endsWith(".md"));
  const slugs = files.map(slugOf);
  const ordered = ORDER.filter((slug) => slugs.includes(slug));
  return [...ordered, ...slugs.filter((slug) => !ordered.includes(slug))];
}

export async function getDocList(): Promise<DocMeta[]> {
  const slugs = await getDocSlugs();
  return Promise.all(
    slugs.map(async (slug) => {
      const markdown = await readDoc(slug);
      return {
        slug,
        title: titleOf(markdown, slug),
        summary: SUMMARIES[slug] ?? summaryOf(markdown),
      };
    }),
  );
}

export async function getDoc(slug: string) {
  const markdown = await readDoc(slug);
  // The source files live in a repo where they sit next to each other, so
  // cross-references are written as ./with-parser.md. Point them at routes.
  const linked = markdown.replace(
    /\]\(\.\/([a-z0-9-]+)\.md(#[^)]*)?\)/gi,
    (_match, target, hash = "") => `](/docs/${target}${hash})`,
  );
  // The H1 becomes the page header, rendered outside the prose block.
  const withoutTitle = linked.replace(/^#\s+.+$/m, "");
  const { html, headings } = withHeadingIds(await renderMarkdown(withoutTitle));

  return {
    slug,
    title: titleOf(markdown, slug),
    summary: SUMMARIES[slug] ?? summaryOf(markdown),
    html,
    headings,
  };
}
