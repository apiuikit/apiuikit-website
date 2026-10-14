import { THEME_PRESETS } from "@/lib/themePresets";
import ThemeEnginePicker from "./ThemeEnginePicker";

export default function ThemeEngine() {
  return (
    <section className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
          Theme engine
        </p>
        <div className="mt-4 max-w-4xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
          <h2 className="font-bold text-ink">Your brand, on every page.</h2>
          <p className="text-ink-faint">
            Pick one of {THEME_PRESETS.length} presets or set your own colors,
            for light and dark. Every section follows, with no CSS to write.
          </p>
        </div>

        <ThemeEnginePicker />
      </div>
    </section>
  );
}
