import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { Navbar } from "@/components/Navbar";
import { NewsSection } from "@/components/NewsSection";
import { EventsSection } from "@/components/EventsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <NewsSection />
      <EventsSection />
    </div>
  );
};

export default Index;