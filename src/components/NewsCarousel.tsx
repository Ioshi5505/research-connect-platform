import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface News {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url: string | null;
  published: boolean;
}

interface NewsCarouselProps {
  news: News[];
}

export const NewsCarousel = ({ news }: NewsCarouselProps) => {
  console.log('Rendering NewsCarousel with news:', news);

  if (!news.length) {
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
            <Card>
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
              <CardContent>
                <p className="line-clamp-3">{item.content}</p>
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