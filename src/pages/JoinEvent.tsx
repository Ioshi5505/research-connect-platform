import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JoinEventForm } from "@/components/JoinEventForm";

const JoinEvent = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Мероприятие не найдено</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Присоединиться к мероприятию</h1>
          <JoinEventForm eventId={id} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JoinEvent;