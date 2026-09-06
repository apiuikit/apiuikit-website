import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import PluginsNav from "@/components/plugins/PluginsNav";
import { getPluginCatalog } from "@/lib/plugins";

export default async function PluginsLayout({
  children,
}: LayoutProps<"/plugins">) {
  const plugins = getPluginCatalog();

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-chrome-bg">
      <Header />
      <main className="flex-1 border-t border-chrome-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 border-chrome-border lg:grid-cols-[15rem_1fr] lg:items-start lg:gap-x-0 lg:border-x">
            <aside className="min-w-0 pt-10 lg:sticky lg:top-24 lg:self-start lg:pr-8 lg:pb-10">
              <PluginsNav plugins={plugins} />
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
