import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { Marked, type Token } from "marked";
import { highlight } from "./highlight";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Inverse of escapeHtml, plus &#39; (marked's own escaper also emits this
 *  one). &amp; decodes last so a literal "&lt;" in the source isn't
 *  double-unescaped into "<". */
function unescapeHtml(text: string) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function codeKey(lang: string | undefined, text: string) {
  return `${lang ?? ""} ${text}`;
}

/** Every fenced block in the tree, including ones nested in lists or quotes. */
function collectCodeTokens(tokens: Token[], found: Token[] = []) {
  for (const token of tokens) {
    if (token.type === "code") found.push(token);
    const nested = (token as { tokens?: Token[] }).tokens;
    if (nested) collectCodeTokens(nested, found);
    const items = (token as { items?: Token[] }).items;
    if (items) collectCodeTokens(items, found);
  }
  return found;
}

/**
 * Two passes, because shiki is async and marked's renderer is not: lex to find
 * the code blocks, highlight them all, then render with a renderer that looks
 * each one up. Runs at build time, so the pages ship as static HTML with no
 * highlighting library in the browser bundle.
 */
async function renderMarkdown(source: string): Promise<string> {
  const codeTokens = collectCodeTokens(new Marked().lexer(source));
  const highlighted = new Map<string, string>();

  await Promise.all(
    codeTokens.map(async (token) => {
      const { text, lang } = token as { text: string; lang?: string };
      const key = codeKey(lang, text);
      if (highlighted.has(key)) return;
      highlighted.set(key, await highlight(text, lang));
    }),
  );

  const marked = new Marked({
    renderer: {
      code({ text, lang }) {
        return (
          highlighted.get(codeKey(lang, text)) ??
          `<pre><code>${escapeHtml(text)}</code></pre>`
        );
      },
    },
  });

  return marked.parse(source) as Promise<string>;
}

/**
 * Reading order, not alphabetical: someone landing on /docs should meet the
 * entry points before the format-specific pages. Any file not listed here
 * still renders, appended in directory order.
 */
const ORDER = [
  "getting-started",
  "configuration",
  "no-parser",
  "with-parser",
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
  configuration:
    "Every option on the config object: which sections to show, what starts expanded, theming, side panels, and Markdown output.",
  "no-parser":
    "For documents you already hold as an object. AsyncAPI and OpenAPI components, their props, and what each one renders.",
  "with-parser":
    "For raw YAML or JSON strings. The renderer components and imperative helpers, with parse diagnostics separate from render errors.",
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
    "Use apiuikit from Vue, Angular, Svelte, or plain HTML through four custom elements.",
};

export interface DocMeta {
  slug: string;
  title: string;
  /** First paragraph, used as the card blurb on the index. */
  summary: string;
}

export interface DocHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * marked emits bare `<h2>…</h2>`, so there is nothing to link to. This walks
 * the rendered HTML in document order, giving each h2/h3 an id and collecting
 * the same list for the table of contents — one pass, so the ids and the TOC
 * entries can't drift apart.
 */
function withHeadingIds(html: string) {
  const headings: DocHeading[] = [];
  const seen = new Map<string, number>();

  const withIds = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const text = unescapeHtml(inner.replace(/<[^>]+>/g, "")).trim();
      const base = slugify(text) || `section-${headings.length + 1}`;
      // Two headings can share a name across a long page; suffix the repeats
      // so every anchor stays unique.
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;

      headings.push({ id, text, depth: Number(level) as 2 | 3 });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: withIds, headings };
}

function slugOf(filename: string) {
  return filename.replace(/\.md$/, "");
}

/** The `# Heading` on the first line, falling back to the slug. */
function titleOf(markdown: string, slug: string) {
  return markdown.match(/^#\s+(.+)$/m)?.[1].trim() ?? slug;
}

/** First non-heading, non-empty block, flattened to plain text. */
function summaryOf(markdown: string) {
  const body = markdown
    .split("\n")
    .filter((line) => !line.startsWith("#"))
    .join("\n");
  const paragraph = body.split(/\n\s*\n/).find((block) => block.trim()) ?? "";
  return paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → their text
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
