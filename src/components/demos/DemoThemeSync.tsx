"use client";

import type { ConfigInterface } from "apiuikit";
import { defaultConfig } from "apiuikit";
import { useTheme } from "@/components/site/ThemeProvider";

type DemoTheme = ConfigInterface["theme"];

// defaultConfig always sets theme (see apiuikit/packages/lib/src/config/default.ts);
// ConfigInterface only declares it optional because consumers may omit it.
const baseTheme = defaultConfig.theme!;

/**
 * The site's own palette, in the shape apiuikit's theme expects. These are the
 * literal values of the tokens in globals.css, so a widget paints the same
 * surfaces, borders and text colours as the page around it rather than its own
 * near-miss defaults. Keep in step with :root / :root[data-theme="dark"].
 *
 * `background` is deliberately the site's surface, not its page background:
 * every widget on this site sits inside a card, and a widget painting the page
 * colour inside a surface-coloured card shows as a mismatched panel.
 */
const SITE_THEME = {
  light: {
    background: "#ffffff", // --chrome-surface
    surface: "#f8fafc", // --chrome-bg
    border: "#e2e8f0", // --chrome-border
    textPrimary: "#1e293b", // --ink
    textSecondary: "#475569", // --ink-muted
    textMuted: "#64748b", // --ink-faint
  },
  dark: {
    background: "#161b22", // --chrome-surface
    surface: "#0d1117", // --chrome-bg
    border: "#30363d", // --chrome-border
    textPrimary: "#c9d1d9", // --ink
    textSecondary: "#adbac7", // --ink-muted
    textMuted: "#8b949e", // --ink-faint
  },
} as const;

/**
 * Mirrors packages/playground/src/Playground.tsx's theme-sync pattern: only
 * one of light/dark is ever passed, since buildThemeVars() has light win
 * when both are set (utils/theme.ts). Follows the site's own manual toggle
 * (ThemeProvider) rather than OS prefers-color-scheme, so every embedded
 * demo flips in lockstep with the navbar toggle.
 */
export function useDemoTheme(): DemoTheme {
  const { theme } = useTheme();

  return {
    colors: { primary: baseTheme.colors?.primary },
    ...(theme === "dark"
      ? { dark: SITE_THEME.dark }
      : { light: SITE_THEME.light }),
  };
}
