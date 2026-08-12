import StreetlightSpotlight from "@/components/demos/StreetlightSpotlight";

export default function DocsSpotlight() {
  return (
    // No max-width on the section itself: the caption stays on the page's
    // measure, but the widget below breaks out past the 6xl container every
    // other section is bound to.
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <StreetlightSpotlight />
        {/* One line, below the widget rather than above it: the demo is the
            first thing worth looking at, and this only has to say what it is
            and how to open it. */}
        <p className="mt-4 text-center text-sm text-ink-faint">
          A complete AsyncAPI document rendered by apiuikit. Press play to open
          it full size.
        </p>
      </div>
    </section>
  );
}
