import { Marked, type Token } from "marked";
import { highlight } from "./highlight";

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
    .replace(/>/g, ">")
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
export async function renderMarkdown(source: string): Promise<string> {
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

export interface MarkdownHeading {
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
export function withHeadingIds(html: string) {
  const headings: MarkdownHeading[] = [];
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
      const anchor = `<a class="heading-anchor" href="#${id}" aria-label="Link to ${escapeHtml(text)}">#</a>`;
      return `<h${level} id="${id}">${inner}${anchor}</h${level}>`;
    },
  );

  return { html: withIds, headings };
}

/** The `# Heading` on the first line, falling back to the slug. */
export function titleOf(markdown: string, slug: string) {
  return markdown.match(/^#\s+(.+)$/m)?.[1].trim() ?? slug;
}

/** First non-heading, non-empty block, flattened to plain text. */
export function summaryOf(markdown: string) {
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
