import { ImageResponse } from "next/og";

// iOS ignores SVG favicons and falls back to a screenshot of the page, so the
// same mark is rendered once at build time as the PNG Safari expects.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path d="M10 9L4 16L10 23" stroke="#1473FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 9L28 16L22 23" stroke="#1473FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 6L13 26" stroke="#1473FF" stroke-width="3" stroke-linecap="round"/>
</svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Opaque, because iOS composites the icon onto the home screen
          // without any background of its own.
          background: "#0d1117",
        }}
      >
        <img
          width={116}
          height={116}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(MARK)}`}
          alt=""
        />
      </div>
    ),
    size,
  );
}
