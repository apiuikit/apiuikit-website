const stats = [
  {
    value: "2",
    label: "Kinds of API",
    detail: "REST APIs from OpenAPI and event-driven APIs from AsyncAPI, documented the same way.",
  },
  {
    value: "3",
    label: "Data formats",
    detail: "JSON, Avro, and Protobuf payloads, with nothing extra to install.",
  },
  {
    value: "5",
    label: "Frameworks",
    detail: "Fits whatever your site is built with: React, Vue, Angular, Svelte, or plain HTML.",
  },
];

export default function FeatureStats() {
  return (
    <section className="border-t border-chrome-border bg-chrome-surface">
      <div className="mx-auto max-w-6xl px-6">
        <div className="py-16">
          {/* Same eyebrow treatment as the gallery's nav label. */}
          <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
            Why apiuikit
          </p>
          {/* The gallery's type pattern, one step up: a single size and family
              across both lines, split only by weight and colour. */}
          <div className="mt-4 max-w-4xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
            <h2 className="font-bold text-ink">
              Docs that ship with your API, not after it.
            </h2>
            <p className="text-ink-faint">
              Hand-written docs drift the moment the API changes, and building
              your own renderer takes weeks. apiuikit reads the spec you
              already maintain, so your docs stay accurate without anyone
              having to own them.
            </p>
          </div>
        </div>

        {/* divide-x draws the internal verticals, and the dl's own top rule is
            what they terminate against — the same connected-lines idea as the
            gallery grid above. */}
        <dl className="grid grid-cols-1 border-t border-chrome-border sm:grid-cols-3 sm:divide-x sm:divide-chrome-border">
          {stats.map(({ value, label, detail }) => (
            <div
              key={label}
              className="border-t border-chrome-border py-10 first:border-t-0 sm:border-t-0 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="font-display text-5xl font-bold tracking-tight text-brand-600 sm:text-6xl">
                {value}
              </dt>
              <dd className="mt-3 font-medium text-ink">{label}</dd>
              <dd className="mt-1 text-sm text-ink-faint">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
