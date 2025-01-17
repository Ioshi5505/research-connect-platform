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

export const EventsCarousel = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="text-center">Загрузка...</div>;

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {events?.map((event) => (
          <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{event.description}</p>
                <p className="text-sm font-semibold text-primary mt-4">
                  {new Date(event.date).toLocaleDateString("ru-RU")}
                </p>
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