import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NewsArticle = () => {
  const { id } = useParams();
  console.log('Fetching news article with id:', id);

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }

      console.log('Fetched news article:', data);
      return data;
    },
    enabled: !!id,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Произошла ошибка при загрузке новости
          </div>
        ) : news ? (
          <article className="max-w-4xl mx-auto">
            {news.image_url && (
              <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
                <img
                  src={news.image_url}
                  alt={news.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
            <div className="text-muted-foreground mb-8">
              {format(new Date(news.created_at), 'dd.MM.yyyy')}
            </div>
            <div className="prose prose-invert max-w-none">
              {news.content}
            </div>
          </article>
        ) : (
          <div className="text-center">
            Новость не найдена
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NewsArticle;