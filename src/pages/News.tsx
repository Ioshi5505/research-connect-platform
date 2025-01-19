import { useSession } from "@supabase/auth-helpers-react";
import { AddNewsForm } from "@/components/AddNewsForm";
import { NewsCarousel } from "@/components/NewsCarousel";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const News = () => {
  const session = useSession();

  return (
    <div>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12">Новости</h1>
          
          {session && (
            <div className="mb-16 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Создать новость</h2>
              <AddNewsForm />
            </div>
          )}

          <section>
            <h2 className="text-2xl font-semibold mb-8">Последние новости</h2>
            <NewsCarousel />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;