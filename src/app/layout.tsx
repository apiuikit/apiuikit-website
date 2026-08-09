import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "apiuikit/style.css";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "apiuikit — Interactive API docs from your spec",
  description:
    "Point apiuikit at an AsyncAPI or OpenAPI document and get a full interactive documentation UI, with no manual mapping required.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
