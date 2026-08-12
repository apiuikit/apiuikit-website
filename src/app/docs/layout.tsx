import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import DocsNav from "@/components/docs/DocsNav";
import { getDocList } from "@/lib/docs";

export default async function DocsLayout({ children }: LayoutProps<"/docs">) {
  const docs = await getDocList();

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-chrome-bg">
      <Header />
      {/* Same connected-rule grid as the landing page's component gallery:
          a full-bleed top rule with the columns' verticals starting on it. */}
      <main className="flex-1 border-t border-chrome-border">
        {/* Wider than the landing page's 6xl: the docs carry a rail on the
            left and a TOC on the right, and the prose measure has to survive
            both. */}
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 border-chrome-border lg:grid-cols-[15rem_1fr] lg:items-start lg:gap-x-0 lg:border-x">
            <aside className="pt-10 lg:sticky lg:top-24 lg:self-start lg:pr-8 lg:pb-10">
              <DocsNav docs={docs} />
            </aside>
            <div className="min-w-0 py-10 lg:border-l lg:border-chrome-border lg:pl-12">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
