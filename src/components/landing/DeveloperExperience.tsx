import { highlight } from "@/lib/highlight";
import DeveloperExperienceTabs from "./DeveloperExperienceTabs";

// Code verbatim from apiuikit/README.md — the same "three ways to use it"
// story as packages/lib/src/stories/Introduction.mdx.
const tiers = [
  {
    id: "widget",
    label: "The whole widget",
    description:
      "The fastest path: hand it a document, get a full documentation page.",
    code: `import { AsyncAPI } from "apiuikit";
import "apiuikit/style.css";
import doc from "./asyncapi.json";

export default function App() {
  return <AsyncAPI asyncapi={doc} />;
}`,
  },
  {
    id: "section",
    label: "One section, standalone",
    description:
      "Prefer your own layout? Render a single section on its own.",
    code: `import { AsyncAPIOperations } from "apiuikit";
import doc from "./asyncapi.json";

export default function OperationsPage() {
  return <AsyncAPIOperations document={doc} layout="stacked" />;
}`,
  },
  {
    id: "composed",
    label: "Several sections, composed",
    description:
      "Arrange multiple sections in a custom layout, sharing one resolved document.",
    code: `import { AsyncAPIProvider, AsyncAPIServers, AsyncAPIOperations, Schemas } from "apiuikit";

export default function CustomLayout() {
  return (
    <AsyncAPIProvider document={doc}>
      <AsyncAPIServers />
      <AsyncAPIOperations layout="stacked" />
      <Schemas layout="stacked" />
    </AsyncAPIProvider>
  );
}`,
  },
];

export default async function DeveloperExperience() {
  // Same dual-theme highlighter the docs pages use, so these blocks follow the
  // site's light/dark toggle: the light palette lands inline and the dark one
  // as CSS variables that globals.css promotes under [data-theme="dark"].
  const highlightedTiers = await Promise.all(
    tiers.map(async (tier) => ({
      ...tier,
      html: await highlight(tier.code, "tsx"),
    })),
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
        How you use it
      </p>
      <div className="mt-4 max-w-4xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
        <h2 className="font-bold text-ink">Three ways to use it.</h2>
        <p className="text-ink-faint">
          Start with the whole widget, drop down to a single section, or
          compose several. Same API, whatever granularity your layout needs.
        </p>
      </div>

      <DeveloperExperienceTabs tiers={highlightedTiers} />
    </section>
  );
}
