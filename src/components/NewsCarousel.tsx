import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface News {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url: string | null;
  published: boolean;
  author_id: string;
}

interface NewsCarouselProps {
  news: News[];
  showDeleteButton?: boolean;
}

export const NewsCarousel = ({ news, showDeleteButton = false }: NewsCarouselProps) => {
  console.log('Rendering NewsCarousel with news:', news);
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Новость успешно удалена",
      });

      // Обновляем кэш
      queryClient.invalidateQueries({ queryKey: ['news'] });
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить новость",
      });
    }
  };

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Нет доступных новостей
      </div>
    );
  }

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {news.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full flex flex-col">
              {item.image_url && (
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <div className="text-sm text-gray-500">
                  {format(new Date(item.created_at), 'dd.MM.yyyy')}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="line-clamp-3">{item.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/news/${item.id}`)}
                >
                  Подробнее
                </Button>
                {showDeleteButton && session?.user?.id === item.author_id && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};