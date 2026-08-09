const stats = [
  {
    value: "2",
    label: "Spec formats",
    detail: "AsyncAPI 3.x and OpenAPI 3.0/3.1, fully supported.",
  },
  {
    value: "3",
    label: "Schema formats",
    detail: "JSON Schema, Avro, and Protobuf — no extra install required.",
  },
  {
    value: "5",
    label: "Framework targets",
    detail: "React, Vue, Angular, Svelte, and vanilla HTML via web components.",
  },
];

export default function FeatureStats() {
  return (
    <section className="border-y border-chrome-border bg-chrome-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-brand-600">Why apiuikit</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Modular pieces, not a monolith
            </h2>
          </div>
          <p className="self-center text-ink-muted">
            Nailing servers, operations, schemas, and auth flows for two spec
            formats is a lot of undifferentiated work. apiuikit builds each
            piece as its own component, so you assemble only what your
            layout needs instead of maintaining a renderer from scratch.
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-4xl font-semibold text-ink">{stat.value}</dt>
              <dd className="mt-2 text-sm font-medium text-ink">{stat.label}</dd>
              <dd className="mt-1 text-sm text-ink-faint">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
