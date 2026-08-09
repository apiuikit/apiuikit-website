import DeepDiveWidget from "@/components/demos/DeepDiveWidget";

const callouts = [
  {
    title: "Composable sections",
    description: "Render one section standalone, or compose several under a shared provider.",
  },
  {
    title: "Multi-format schemas",
    description: "Avro and Protobuf payloads supported out of the box, no extra install.",
  },
  {
    title: "AI-readable by default",
    description: "Every document ships a Copy-as-Markdown button and llms.txt helpers.",
  },
  {
    title: "Any framework",
    description: "The web-component package wraps React internally for Vue, Angular, Svelte, or plain HTML.",
  },
  {
    title: "Full auth coverage",
    description: "API key, HTTP, OAuth2, and OpenID Connect security, rendered automatically.",
  },
  {
    title: "OpenAPI webhooks",
    description: "OpenAPI 3.1 webhooks render alongside regular endpoints.",
  },
  {
    title: "Built-in search",
    description: "Every section is searchable from the sidebar, no setup required.",
  },
  {
    title: "Themeable",
    description: "Light and dark themes out of the box, and a config object to override every color.",
  },
];

function CalloutList() {
  return (
    <ul className="flex flex-col gap-5">
      {callouts.map((item) => (
        <li key={item.title} className="flex gap-3">
          <span
            aria-hidden
            className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700"
          >
            ✓
          </span>
          <div>
            <p className="text-sm font-medium text-ink">{item.title}</p>
            <p className="mt-0.5 text-sm text-ink-faint">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ShowcaseDeepDive() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-brand-600">Case in point</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          So, you think you can build API docs?
        </h2>
        <p className="mt-3 text-ink-muted">
          This widget is composed from the same modular sections you can use
          standalone — scroll it, search it, click an operation.
        </p>
      </div>

      {/* lg+: widget gets the wider column, callouts stack on the right.
          Below lg: everything stacks, widget first. */}
      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:items-start">
        <DeepDiveWidget />
        <CalloutList />
      </div>
    </section>
  );
}
