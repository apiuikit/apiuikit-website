import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-chrome-bg">
      <Header />
      {/* The docs' connected-rule frame, minus the nav rail: posts are read
          start to finish, so there is nothing to navigate between. */}
      <main className="flex-1 border-t border-chrome-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="min-w-0 border-chrome-border py-10 lg:border-x lg:px-12">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
