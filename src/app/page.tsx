import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Hero from "@/components/landing/Hero";
import DocsSpotlight from "@/components/landing/DocsSpotlight";
import ComponentGallery from "@/components/landing/ComponentGallery";
import FeatureStats from "@/components/landing/FeatureStats";
import Showcase from "@/components/landing/Showcase";
import DeveloperExperience from "@/components/landing/DeveloperExperience";
import CliSpotlight from "@/components/landing/CliSpotlight";
import Adoption from "@/components/landing/Adoption";
import GetHelp from "@/components/landing/GetHelp";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-chrome-bg">
      <Header />
      <main className="flex-1">
        <Hero />
        <DocsSpotlight />
        <FeatureStats />
        <ComponentGallery />
        <Showcase />
        <DeveloperExperience />
        <CliSpotlight />
        <Adoption />
        <GetHelp />
      </main>
      <Footer />
    </div>
  );
}
