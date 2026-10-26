export interface BlogAuthor {
  name: string;
  url?: string;
}

export interface BlogPostEntry {
  slug: string;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD) the post went out. */
  publishedAt: string;
  author: BlogAuthor;
  /** Posts are published elsewhere and linked to, not hosted here. */
  url: string;
  /** Where `url` lives, shown on the card ("Read on Medium"). */
  publisher: string;
  coverImage?: string;
  coverAlt?: string;
}

export const BLOG_POSTS: BlogPostEntry[] = [
  {
    slug: "your-api-docs-dont-need-a-separate-website",
    title: "Your API Docs Don't Need a Separate Website",
    summary:
      "Treat your API reference like any other part of your React app: drop apiuikit's components into an existing site, next to your own guides, in your own brand.",
    publishedAt: "2026-10-18",
    author: {
      name: "Mohammed Mehdi",
      url: "https://medium.com/@mohdmehdi2003",
    },
    url: "https://medium.com/@mohdmehdi2003/your-api-docs-dont-need-a-separate-website-f4b82900c712",
    publisher: "Medium",
    coverImage: "/blog/your-api-docs-dont-need-a-separate-website.png",
    coverAlt: "Embed OpenAPI + AsyncAPI docs directly into your own UI",
  },
];

/** Newest first. */
export function getBlogPosts(): BlogPostEntry[] {
  return [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

/** "18 October 2026". Parsed as UTC so the day can't shift with the build
 *  machine's timezone. */
export function formatPostDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
