import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AddNewsForm } from "@/components/AddNewsForm";
import { NewsCarousel } from "@/components/NewsCarousel";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";

const News = () => {
  const session = useSession();

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      console.log('Fetching news...');
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          profiles:author_id (
            role
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }

      console.log('News fetched successfully:', data);
      return data;
    },
  });

  if (error) {
    console.error('Query error:', error);
    return (
      <div>
        <Navbar />
        <main className="min-h-screen py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12">Новости</h1>
            <div className="text-center text-red-500">
              Произошла ошибка при загрузке новостей. Пожалуйста, попробуйте позже.
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <NewsCarousel news={news || []} />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;