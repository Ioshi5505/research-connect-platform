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
import { UserPlus } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";

export const EventsCarousel = () => {
  const session = useSession();
  const { toast } = useToast();

  const { data: events, isLoading } = useQuery({
    queryKey: ["recent-events"],
    queryFn: async () => {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      const { data, error } = await supabase
        .from("events")
        .select("*, event_participants(user_id)")
        .gte("date", twoMonthsAgo.toISOString())
        .order("date", { ascending: true })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  const handleJoin = async (eventId: string) => {
    try {
      if (!session?.user?.id) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Необходимо авторизоваться",
        });
        return;
      }

      const { error: joinError } = await supabase
        .from("event_participants")
        .insert({
          event_id: eventId,
          user_id: session.user.id,
        });

      if (joinError) throw joinError;

      toast({
        title: "Успех",
        description: "Вы успешно присоединились к мероприятию",
      });
    } catch (error) {
      console.error("Error joining event:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось присоединиться к мероприятию",
      });
    }
  };

  const isUserParticipant = (event: any) => {
    return event.event_participants?.some((p: any) => p.user_id === session?.user?.id);
  };

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
                {event.participants_limit && (
                  <p className="text-sm text-gray-500 mt-2">
                    Участники: {event.current_participants} / {event.participants_limit}
                  </p>
                )}
                {session?.user?.id && !isUserParticipant(event) && (
                  <Button
                    onClick={() => handleJoin(event.id)}
                    disabled={event.participants_limit && event.current_participants >= event.participants_limit}
                    className="w-full mt-4"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Присоединиться
                  </Button>
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