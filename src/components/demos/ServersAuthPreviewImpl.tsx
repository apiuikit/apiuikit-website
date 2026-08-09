"use client";

import { Servers } from "apiuikit";
import { streetlightKafka } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

// `Authorization` isn't a public export (see Introduction.mdx's "Internal"
// section) — it only ever renders inside Servers/Operations. streetlightKafka's
// server declares apiKey + OAuth2 + OpenID Connect security, which renders
// immediately with no click needed, so this doubles as the auth-rendering demo.
export default function ServersAuthPreviewImpl() {
  const theme = useDemoTheme();
  return <Servers document={streetlightKafka} config={{ theme }} />;
}
