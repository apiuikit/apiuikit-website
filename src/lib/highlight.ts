import { codeToHtml, bundledLanguages } from "shiki";

/** Shiki emits both palettes in one pass: the light one inline, the dark one as
 *  CSS variables that globals.css switches on under [data-theme="dark"]. */
export const SHIKI_THEMES = { light: "github-light", dark: "github-dark" } as const;

/**
 * Highlights at build time, so pages ship as static HTML with no highlighting
 * library in the browser bundle. Unknown languages fall back to plain text
 * rather than throwing the build.
 */
export async function highlight(code: string, lang?: string) {
  const language = lang && lang in bundledLanguages ? lang : "text";
  return codeToHtml(code, { lang: language, themes: SHIKI_THEMES });
}
