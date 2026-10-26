import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { formatPostDate, getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | apiuikit",
  description:
    "Guides, walkthroughs, and release notes from the apiuikit team on building API documentation from OpenAPI and AsyncAPI specs.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
        Blog
      </p>
      <div className="mt-4 max-w-3xl font-display text-3xl leading-[1.25] tracking-tight text-pretty sm:text-4xl">
        <h1 className="font-bold text-ink">Notes from the team.</h1>
        <p className="text-ink-faint">
          Walkthroughs and ideas for building API documentation that fits the
          product around it.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface transition-colors hover:border-brand-300"
            >
              <div className="relative aspect-1024/536 overflow-hidden border-b border-chrome-border bg-chrome-bg">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt ?? post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-center font-display text-lg font-medium text-ink-faint">
                    {post.title}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-ink-faint">
                  <time dateTime={post.publishedAt}>
                    {formatPostDate(post.publishedAt)}
                  </time>
                  {" · "}
                  {post.author.name}
                </p>
                <p className="mt-2 font-medium text-ink">{post.title}</p>
                <p className="mt-2 text-sm text-ink-faint">{post.summary}</p>
                <p className="mt-auto pt-4 text-sm font-medium text-brand-600">
                  Read on {post.publisher} ↗
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
