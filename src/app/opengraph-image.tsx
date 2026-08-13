import { ImageResponse } from "next/og";

// Next picks this file up automatically for og:image and twitter:image, and
// renders it once at build time — no static asset to keep in sync with the
// copy, and no runtime cost.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "apiuikit: interactive API docs from your AsyncAPI or OpenAPI spec";

// The site's dark palette, since a card renders against unknown chrome in
// every feed and dark reads as deliberate in both.
const BG = "#0d1117";
const SURFACE = "#161b22";
const BORDER = "#30363d";
const INK = "#e6edf3";
const MUTED = "#8b949e";
const BRAND = "#58a6ff";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          // The hero's graph-paper backdrop, as two repeating gradients.
          backgroundImage: `linear-gradient(to right, ${BORDER}55 1px, transparent 1px), linear-gradient(to bottom, ${BORDER}55 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34 }}>
          <span style={{ color: BRAND }}>&lt;</span>
          <span style={{ color: INK, fontWeight: 700, padding: "0 8px" }}>
            apiuikit
          </span>
          <span style={{ color: BRAND }}>/&gt;</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.1,
              fontWeight: 800,
              color: INK,
              letterSpacing: -2,
            }}
          >
            Interactive API docs, rendered from your spec.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: MUTED,
              maxWidth: 900,
            }}
          >
            A React component library for AsyncAPI and OpenAPI documents.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["AsyncAPI 3.x", "OpenAPI 3.0 / 3.1", "React", "Web components"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: `1px solid ${BORDER}`,
                  background: SURFACE,
                  color: MUTED,
                  fontSize: 24,
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
