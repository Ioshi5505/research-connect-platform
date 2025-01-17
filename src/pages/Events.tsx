import { EventsSection } from "@/components/EventsSection";
import { Navbar } from "@/components/Navbar";

const Events = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <EventsSection />
    </div>
  );
};

export default Events;