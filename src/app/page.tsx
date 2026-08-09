import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Hero from "@/components/landing/Hero";
import FeatureStats from "@/components/landing/FeatureStats";
import ShowcaseDeepDive from "@/components/landing/ShowcaseDeepDive";
import AiReadiness from "@/components/landing/AiReadiness";
import DeveloperExperience from "@/components/landing/DeveloperExperience";
import Adoption from "@/components/landing/Adoption";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-chrome-bg">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeatureStats />
        <ShowcaseDeepDive />
        <AiReadiness />
        <DeveloperExperience />
        <Adoption />
      </main>
      <Footer />
    </div>
  );
}
