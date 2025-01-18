import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { Navbar } from "@/components/Navbar";
import { EventsCarousel } from "@/components/EventsCarousel";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <AboutSection />
      <section className="py-16 bg-gradient-to-r from-accent/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Предстоящие мероприятия</h2>
          <EventsCarousel />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;