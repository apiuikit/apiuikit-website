"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/site/ThemeProvider";
import ThemedDocument from "@/components/demos/ThemedDocument";
import { THEME_PRESETS, colorScale } from "@/lib/themePresets";

type Mode = "light" | "dark";

export default function ThemeEnginePicker() {
  const { theme: siteMode } = useTheme();
  const [presetId, setPresetId] = useState("mars");
  // null follows the site toggle; picking a mode here pins it for this demo.
  const [modeOverride, setModeOverride] = useState<Mode | null>(null);
  // The server always renders light, so the first client render has to as
  // well or hydration mismatches; see ThemeToggle.tsx.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const mode = modeOverride ?? (mounted ? siteMode : "light");

  const preset =
    THEME_PRESETS.find(({ id }) => id === presetId) ?? THEME_PRESETS[0];

  // Only one of light/dark is ever passed: apiuikit lets light win when both
  // are set (see DemoThemeSync.tsx). Memoised so the widget only re-themes
  // when the preset or mode actually changes.
  const theme = useMemo(
    () => ({
      colors: { primary: colorScale(preset.accent) },
      [mode]: preset[mode],
    }),
    [preset, mode],
  );

  return (
    <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-medium tracking-wide text-ink-faint uppercase">
            Presets
          </p>
          <div
            role="group"
            aria-label="Preview mode"
            className="flex rounded-lg border border-chrome-border bg-chrome-surface p-0.5"
          >
            {(["light", "dark"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setModeOverride(option)}
                aria-pressed={mode === option}
                className={`cursor-pointer rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  mode === option
                    ? "bg-chrome-bg text-ink shadow-sm"
                    : "text-ink-faint hover:text-ink"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div
          role="group"
          aria-label="Theme presets"
          className="mt-4 grid grid-cols-2 gap-2"
        >
          {THEME_PRESETS.map((option) => {
            const isActive = option.id === presetId;
            const colors = option[mode];
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setPresetId(option.id)}
                aria-pressed={isActive}
                aria-controls="theme-engine-preview"
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  isActive
                    ? "border-brand-600 bg-brand-600/10 text-ink"
                    : "border-chrome-border bg-chrome-surface text-ink-muted hover:border-ink-faint hover:text-ink"
                }`}
              >
                {/* The four colours the preset sets, in the current mode:
                    page, surface, border, accent. */}
                <span
                  aria-hidden
                  className="flex shrink-0 overflow-hidden rounded border border-chrome-border"
                >
                  {[
                    colors.background,
                    colors.surface,
                    colors.border,
                    option.accent,
                  ].map((color, i) => (
                    <span
                      key={i}
                      className="h-5 w-3.5"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>
                <span className="truncate">{option.name}</span>
              </button>
            );
          })}
        </div>

        {/* Inline colour: apiuikit's unlayered `a { color: inherit }` would
            otherwise beat a text-* utility here. */}
        <Link
          href="/docs/configuration#theme"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium underline-offset-2 hover:underline"
          style={{ color: "var(--color-brand-600)" }}
        >
          Learn more
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </Link>
      </div>

      <div
        id="theme-engine-preview"
        className="min-w-0 overflow-hidden rounded-xl border border-chrome-border shadow-sm"
      >
        <div className="flex items-center gap-1.5 border-b border-chrome-border bg-chrome-surface px-4 py-2.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-ink-faint">
            petstore.json · {preset.name}
          </span>
        </div>
        {/* Painted with the preset's own page colour, so the area around the
            widget changes with it rather than staying the site's. Fixed
            height, scrolling inside, so the page doesn't jump between
            presets.

            The scroll lives on the widget's own root, not on this frame.
            Component-contained side panels clip to that root's rect, so if
            the root were taller than the frame and scrolled inside it, an
            open panel would start above the frame. */}
        <div
          className="h-[30rem] overflow-hidden transition-colors duration-200 [&>.apiuikit-root]:h-full [&>.apiuikit-root]:overflow-auto"
          style={{ backgroundColor: preset[mode].background }}
        >
          <ThemedDocument theme={theme} />
        </div>
      </div>
    </div>
  );
}
