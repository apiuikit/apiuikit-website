import Link from "next/link";
import PreviewCard from "@/components/demos/PreviewCard";
import OperationsPreview from "@/components/demos/OperationsPreview";
import OpenAPIEndpointsPreview from "@/components/demos/OpenAPIEndpointsPreview";
import ServersAuthPreview from "@/components/demos/ServersAuthPreview";
import MessagesPreview from "@/components/demos/MessagesPreview";
import SchemaTreePreview from "@/components/demos/SchemaTreePreview";
import InfoPreview from "@/components/demos/InfoPreview";

const PLAYGROUND_URL = "https://playground.apiuikit.com";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Point it at a spec.
        <br />
        Compose the UI you need.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink-muted">
        apiuikit renders AsyncAPI and OpenAPI documents as modular,
        composable components — drop in the whole widget, one section on its
        own, or arrange exactly the pieces your layout needs. Every card
        below is a real, live, clickable apiuikit component.
      </p>
      {/* Inline color, not text-white: apiuikit/style.css sets a plain,
          unlayered `a { color: inherit }` rule, which beats any Tailwind
          utility class (Tailwind utilities live in @layer, and unlayered
          CSS always wins regardless of specificity). Inline style is the
          one thing that reliably wins here. */}
      <Link
        href={PLAYGROUND_URL}
        className="mt-8 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-brand-700"
        style={{ color: "#ffffff" }}
      >
        Try it out →
      </Link>

      <div className="mt-16 flex flex-col gap-14">
        <PreviewCard
          title="Operations"
          description="Every operation, request and reply, rendered from the spec."
        >
          <OperationsPreview />
        </PreviewCard>
        <PreviewCard
          title="OpenAPI endpoints"
          description="REST paths and methods, rendered the same way, from an OpenAPI document."
        >
          <OpenAPIEndpointsPreview />
        </PreviewCard>
        <PreviewCard
          title="Servers & auth"
          description="API key, OAuth2, and OpenID Connect security, rendered automatically."
        >
          <ServersAuthPreview />
        </PreviewCard>
        <PreviewCard
          title="Messages"
          description="Message payloads and examples, matched to their operations."
        >
          <MessagesPreview />
        </PreviewCard>
        <PreviewCard
          title="Schemas"
          description="Expandable schema trees — nested objects, oneOf, $ref resolution, all built in."
        >
          <SchemaTreePreview />
        </PreviewCard>
        <PreviewCard
          title="Info"
          description="Title, description, license, and other document metadata, parsed automatically."
        >
          <InfoPreview />
        </PreviewCard>
      </div>
    </section>
  );
}
