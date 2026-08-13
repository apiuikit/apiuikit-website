import type { Metadata } from "next";
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google";
// apiuikit first, ours second. Both ship a Tailwind build sharing @layer
// utilities, and ties go to whichever loaded later: ours must win so our
// utilities outrank apiuikit's preflight (which resets heading sizes). The
// reverse collision, on apiuikit's own `hidden @sm:block` markup, is handled
// by never emitting a plain `.hidden` — see the note in globals.css.
import "apiuikit/style.css";
import "./globals.css";
import { ThemeProvider } from "@/components/site/ThemeProvider";

// Runs before first paint so the page never flashes the wrong theme. Light
// is the default regardless of OS preference — only a previously saved
// toggle (via ThemeProvider) switches this to dark.
const THEME_INIT_SCRIPT = `
  try {
    var theme = localStorage.getItem("apiuikit-theme");
    document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
  } catch (e) {}
`;

// UI/body face. Inter is the safe, highly legible interface choice — tall
// x-height, unambiguous 1/l/I, and it holds up at the 12-14px sizes most of
// this page's labels and descriptions run at.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headings. Inter Tight is Inter's own display cut — narrower and denser at
// large sizes — so headings read as heavier without introducing a second
// typeface that has to be reconciled with the UI face.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://apiuikit.com";
const TITLE = "apiuikit: interactive API docs from your AsyncAPI or OpenAPI spec";
const DESCRIPTION =
  "A React component library that renders AsyncAPI and OpenAPI documents as interactive documentation. Use the whole widget, one section, or the exact pieces your layout needs.";

export const metadata: Metadata = {
  // Makes every relative URL below absolute, which Open Graph requires. Also
  // what lets app/opengraph-image.tsx be picked up automatically.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "apiuikit",
  keywords: [
    "AsyncAPI",
    "OpenAPI",
    "API documentation",
    "React components",
    "API reference",
    "documentation generator",
    "event-driven architecture",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "apiuikit",
    locale: "en_US",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${geistMono.variable} h-full antialiased`}
      // data-theme is set by THEME_INIT_SCRIPT below, before React hydrates,
      // so hydration always sees an attribute it didn't render itself.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
