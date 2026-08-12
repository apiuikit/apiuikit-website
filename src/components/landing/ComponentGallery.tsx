"use client";

import { useEffect, useRef, useState } from "react";
import PreviewCard from "@/components/demos/PreviewCard";
import OperationsPreview from "@/components/demos/OperationsPreview";
import OpenAPIEndpointsPreview from "@/components/demos/OpenAPIEndpointsPreview";
import ServersAuthPreview from "@/components/demos/ServersAuthPreview";
import MessagesPreview from "@/components/demos/MessagesPreview";
import SchemaTreePreview from "@/components/demos/SchemaTreePreview";
import InfoPreview from "@/components/demos/InfoPreview";

// Document order matters: the active-item logic below takes the first entry in
// this list that's on screen, which is only "the topmost one" if the array
// matches the rendered order.
const SECTIONS = [
  {
    id: "operations",
    title: "Operations",
    statement: "Every operation, rendered straight from the spec.",
    body: "Payloads, examples, and reply pairs land in place, with nothing to wire up and nothing to keep in sync by hand.",
    Preview: OperationsPreview,
  },
  {
    id: "endpoints",
    title: "OpenAPI endpoints",
    statement: "Every path and method, given the same treatment.",
    body: "Parameters, responses, and generated cURL, JavaScript, and Python samples for each endpoint you publish.",
    Preview: OpenAPIEndpointsPreview,
  },
  {
    id: "servers",
    title: "Servers & auth",
    statement: "Auth that matches what the API actually enforces.",
    body: "Servers, protocols, and API key, HTTP, OAuth2, and OpenID Connect security, read out of the document rather than mapped by hand.",
    Preview: ServersAuthPreview,
  },
  {
    id: "messages",
    title: "Messages",
    statement: "Payloads matched to the operations that carry them.",
    body: "Examples render with the message they belong to, and Avro and Protobuf work out of the box with nothing extra to install.",
    Preview: MessagesPreview,
  },
  {
    id: "schemas",
    title: "Schemas",
    statement: "Deep schemas you can actually follow.",
    body: "Nested objects, oneOf branches, and resolved $refs in an expandable tree, colour-coded by nesting depth.",
    Preview: SchemaTreePreview,
  },
  {
    id: "info",
    title: "Info",
    statement: "The info block, laid out without you touching it.",
    body: "Title, version, description, and license, parsed from the document and re-rendered whenever it changes.",
    Preview: InfoPreview,
  },
];

export default function ComponentGallery() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const coverage = useRef(new Map<string, number>());

  useEffect(() => {
    const nodes = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // How much of the card you can actually see, as a fraction of how
          // much of it *could* be visible at once. A card shorter than the
          // viewport scores 1 only when every pixel of it is on screen; a card
          // taller than the viewport scores 1 when it fills the viewport,
          // which is as "fully in view" as it can ever get.
          const room = Math.min(
            entry.boundingClientRect.height,
            entry.rootBounds?.height ?? window.innerHeight,
          );
          coverage.current.set(
            entry.target.id,
            room > 0 ? entry.intersectionRect.height / room : 0,
          );
        }

        // Ties go to the earlier card, so scrolling down doesn't flip the tab
        // ahead a step while two cards are equally visible.
        let best = SECTIONS[0].id;
        let bestScore = -1;
        for (const { id } of SECTIONS) {
          const score = coverage.current.get(id) ?? 0;
          if (score > bestScore) {
            best = id;
            bestScore = score;
          }
        }
        if (bestScore > 0) setActive(best);
      },
      {
        // Discards the strip behind the sticky header — pixels hidden under it
        // shouldn't count towards a card being "in view".
        rootMargin: "-64px 0px 0px 0px",
        // Fine-grained, so coverage updates continuously as you scroll rather
        // than jumping between a handful of steps.
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function goTo(id: string) {
    // Set it here rather than waiting for the observer, so the tab responds on
    // the same frame as the click instead of after the scroll settles.
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    // The top rule lives on the section, outside the max-width container, so
    // it runs the full width of the page rather than stopping at the content
    // measure like everything below it.
    // No bottom padding: the grid runs right down to the section's edge so its
    // verticals land on the next section's own top rule instead of stopping in
    // open space above it.
    <section className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6">
        {/* Every vertical rule below belongs to this grid or its cells, and the
            grid's top edge sits flush against the section's rule — no padding
            in between — so the frame closes on all four sides instead of the
            verticals starting somewhere below the top line. */}
        <div className="grid gap-8 border-chrome-border lg:grid-cols-[13rem_1fr] lg:items-start lg:gap-x-0 lg:border-x">
          {/* top-24 clears the sticky site header. Horizontal and scrollable on
              small screens, where a sticky sidebar would eat the viewport. */}
          <nav
            aria-label="Components"
            className="pt-10 lg:sticky lg:top-24 lg:self-start lg:pb-10"
          >
            {/* pl matches the buttons' so the label lines up with their text. */}
            <p className="text-xs font-medium tracking-wide text-ink-faint uppercase lg:pl-4">
              Components
            </p>
            {/* No rail of its own from lg up: the grid's left border is the
                rail, and each item's accent sits directly on it. */}
            <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-0 lg:flex-col lg:gap-0 lg:overflow-x-visible">
              {SECTIONS.map(({ id, title }) => {
                const isActive = id === active;
                return (
                  <li key={id} className="shrink-0">
                    {/* button, not an anchor: apiuikit ships an unlayered
                        `a { color: inherit }` rule that would beat the active/
                        inactive text colors below. */}
                    <button
                      type="button"
                      onClick={() => goTo(id)}
                      aria-current={isActive ? "true" : undefined}
                      // Accent is border-l at every breakpoint, never an
                      // underline. -ml-px lays the 2px accent over the grid's
                      // 1px left border from lg up so they share an edge
                      // instead of stacking into a step.
                      className={`w-full cursor-pointer border-l-2 py-2.5 pr-4 pl-4 text-left text-sm whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:-ml-px ${
                        isActive
                          ? "border-brand-600 bg-chrome-surface font-medium text-ink"
                          : "border-transparent text-ink-faint hover:border-chrome-border hover:bg-chrome-surface hover:text-ink"
                      }`}
                    >
                      {title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* This column's left rule is the second vertical; the dividers
              below terminate against it on one end and against the grid's
              right border on the other. */}
          <div className="flex min-w-0 flex-col lg:border-l lg:border-chrome-border">
            {SECTIONS.map(({ id, title, statement, body, Preview }) => (
              // scroll-mt matches the nav's top offset so a scrolled-to card
              // lands below the header rather than under it. The rules between
              // cards replace what used to be a plain gap.
              <div
                key={id}
                id={id}
                // The inset is padding here rather than on the column, so each
                // border-t spans it and runs wall to wall between the two
                // verticals instead of stopping short of both.
                className="scroll-mt-24 border-t border-chrome-border pt-14 pb-14 first:border-t-0 lg:px-12 lg:pt-10"
              >
                <PreviewCard title={title} statement={statement} body={body}>
                  <Preview />
                </PreviewCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
