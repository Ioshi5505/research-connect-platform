import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";

export const NewsCarousel = () => {
  const session = useSession();
  const { toast } = useToast();

  const { data: news, isLoading } = useQuery({
    queryKey: ["recent-news"],
    queryFn: async () => {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      const { data, error } = await supabase
        .from("news")
        .select("*, profiles(role)")
        .gte("created_at", twoMonthsAgo.toISOString())
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (newsId: string) => {
    try {
      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", newsId);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Новость успешно удалена",
      });
    } catch (error) {
      console.error("Error deleting news:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить новость",
      });
    }
  };

  const isEmployee = (newsItem: any) => {
    return newsItem.profiles?.role === 'employee' && newsItem.author_id === session?.user?.id;
  };

  if (isLoading) return <div className="text-center">Загрузка...</div>;

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {news?.map((newsItem) => (
          <CarouselItem key={newsItem.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{newsItem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {newsItem.image_url && (
                  <div className="mb-4">
                    <img
                      src={newsItem.image_url}
                      alt={newsItem.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                )}
                <p className="text-gray-600 line-clamp-3">{newsItem.content}</p>
                <p className="text-sm font-semibold text-primary mt-4">
                  {new Date(newsItem.created_at).toLocaleDateString("ru-RU")}
                </p>
                {isEmployee(newsItem) && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleDelete(newsItem.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Изменить
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};