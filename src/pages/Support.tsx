import { Navbar } from "@/components/Navbar";
import { SupportRequestForm } from "@/components/SupportRequestForm";

const Support = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">Заявка на сопровождение</h1>
        <div className="bg-card p-6 rounded-lg shadow">
          <SupportRequestForm />
        </div>
      </div>
    </div>
  );
};

export default Support;