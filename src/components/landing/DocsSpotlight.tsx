import StreetlightSpotlight from "@/components/demos/StreetlightSpotlight";

export default function DocsSpotlight() {
  return (
    // Breaks out past the 6xl container every other section is bound to.
    // overflow-x-clip, not overflow-x-hidden: the card scales past its box
    // while the scroll animation runs, and clip contains that without
    // turning this into a scroll container.
    <section className="overflow-x-clip pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <StreetlightSpotlight />
      </div>
    </section>
  );
}
