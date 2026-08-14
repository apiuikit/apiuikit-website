const MAINTAINERS_EMAIL_URL =
  "mailto:ea.elegbede@gmail.com,mohdmehdi2003@gmail.com";

export default function GetHelp() {
  return (
    // Its own top rule: every section boundary on the page is a hairline,
    // and this is the last section before the footer.
    <section className="border-t border-chrome-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl font-display text-2xl leading-[1.3] tracking-tight text-pretty sm:text-3xl">
          <h2 className="font-bold text-ink">
            Get help from the maintainers.
          </h2>
          <p className="text-ink-faint">
            apiuikit is free and open source. We can help you integrate it,
            adopt AsyncAPI or OpenAPI across your team, and work through
            theming or migration questions.
          </p>
        </div>

        {/* Inline color, not text-white — see Hero.tsx's CTA for why. */}
        <a
          href={MAINTAINERS_EMAIL_URL}
          className="mt-8 inline-flex items-center rounded-lg bg-brand-600 px-8 py-3 text-sm font-medium transition-colors hover:bg-brand-700"
          style={{ color: "#ffffff" }}
        >
          Talk to the maintainers
        </a>
      </div>
    </section>
  );
}
