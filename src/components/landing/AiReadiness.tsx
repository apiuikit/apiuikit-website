import CopyMarkdownTeaser from "@/components/demos/CopyMarkdownTeaser";

export default function AiReadiness() {
  return (
    <section className="border-y border-chrome-border bg-chrome-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-medium text-brand-600">Built for agents, not just browsers</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            AI-readable by default
          </h2>
          <p className="mt-4 text-ink-muted">
            Every rendered document carries a floating Copy-as-Markdown
            button: &ldquo;Copy for LLM&rdquo; writes the whole document as
            Markdown to the clipboard, &ldquo;View as Markdown&rdquo; opens
            it in a new tab. Try it on the widget on the right.
          </p>
          <p className="mt-4 text-ink-muted">
            For real deployments, <code className="text-sm text-ink">documentToMarkdown</code> and{" "}
            <code className="text-sm text-ink">documentToLlmsTxt</code> generate
            the same output at build time, so an <code className="text-sm text-ink">llms.txt</code>{" "}
            index can point crawlers and agents at real, hosted URLs instead
            of throwaway blob links.
          </p>
        </div>
        <CopyMarkdownTeaser />
      </div>
    </section>
  );
}
