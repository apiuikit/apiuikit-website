"use client";

import type { ConfigInterface } from "apiuikit";
import { defaultConfig } from "apiuikit";
import { useTheme } from "@/components/site/ThemeProvider";

type DemoTheme = ConfigInterface["theme"];

// defaultConfig always sets theme (see apiuikit/packages/lib/src/config/default.ts);
// ConfigInterface only declares it optional because consumers may omit it.
const baseTheme = defaultConfig.theme!;

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
    ...(theme === "dark" ? { dark: baseTheme.dark } : { light: baseTheme.light }),
  };
}
