import { documentToMarkdown } from "apiuikit/markdown";
import ShowcaseTabs from "@/components/demos/ShowcaseTabs";
import { petstore } from "@/data/examples";
import { highlight } from "@/lib/highlight";

const callouts = [
  {
    title: "Composable sections",
    description:
      "Render one section standalone, or compose several under a shared provider.",
  },
  {
    title: "Multi-format schemas",
    description:
      "Avro and Protobuf payloads supported out of the box, no extra install.",
  },
  {
    title: "AI-readable by default",
    description:
      "Every document ships a Copy-as-Markdown button and llms.txt helpers.",
  },
  {
    title: "Any framework",
    description:
      "The web-component package wraps React internally for Vue, Angular, Svelte, or plain HTML.",
  },
  {
    title: "Full auth coverage",
    description:
      "API key, HTTP, OAuth2, and OpenID Connect security, rendered automatically.",
  },
  {
    title: "OpenAPI webhooks",
    description: "OpenAPI 3.1 webhooks render alongside regular endpoints.",
  },
  {
    title: "Built-in search",
    description:
      "Every section is searchable from the sidebar, no setup required.",
  },
  {
    title: "Themeable",
    description:
      "Light and dark themes out of the box, and a config object to override every color.",
  },
];

/** Stroke-only check, sized to sit on the first line of the label. */
function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.5 4.5 6.5 11.5 3 8" />
    </svg>
  );
}

/** Hairline-separated rows, matching the rule language used across the page.
 *  No outer border: the cell this sits in is already ruled on every side. */
function CalloutList() {
  return (
    <ul className="divide-y divide-chrome-border">
      {callouts.map(({ title, description }) => (
        <li key={title} className="flex gap-3 py-4">
          <CheckIcon />
          <div>
            <p className="text-sm font-medium text-ink">{title}</p>
            <p className="mt-1 text-sm text-ink-faint">{description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function Showcase() {
  // apiuikit/markdown is the DOM-free entry, so this is the library's real
  // export running at build time — not a transcription of what it produces.
  const markdownHtml = await highlight(documentToMarkdown(petstore), "markdown");

  return (
    // scroll-mt clears the sticky header for in-page jumps to #demo.
    <section id="demo" className="scroll-mt-20 border-y border-chrome-border">
      <div className="mx-auto max-w-6xl px-6">
        {/* Same connected-rule frame as the component gallery: verticals on
            the container, horizontals branching off them, and the padding
            inside the cells so every rule runs wall to wall. */}
        <div className="border-chrome-border lg:border-x">
          <div className="py-16 lg:px-10">
            <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
              See it running
            </p>
            <div className="mt-4 max-w-4xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
              <h2 className="font-bold text-ink">
                One document in, a whole documentation site out.
              </h2>
              <p className="text-ink-faint">
                The same Petstore file on both tabs: an interactive page for
                people to read, and Markdown for agents to consume.
              </p>
            </div>
          </div>

          {/* lg+: the demo gets the wider column, callouts beside it, split by
              a vertical rule. Below lg they stack, separated by a horizontal
              one instead.

              minmax(0, …) rather than a bare 3fr/2fr: an fr track's implicit
              minimum is auto, so the Markdown tab's long lines would widen the
              column instead of scrolling inside it, and the frame would resize
              when you switched tabs.

              No items-start: the cells stretch to the row height so the rule
              between them runs all the way down to the section's bottom rule,
              which then joins it to both outer verticals. */}
          <div className="grid grid-cols-1 border-t border-chrome-border lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="py-10 lg:px-10">
              <ShowcaseTabs markdownHtml={markdownHtml} />
            </div>
            <div className="border-t border-chrome-border py-10 lg:border-t-0 lg:border-l lg:px-10">
              <CalloutList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
