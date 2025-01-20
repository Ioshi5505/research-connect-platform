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
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";

export const EventsCarousel = () => {
  const session = useSession();
  const { toast } = useToast();

  const { data: events, isLoading, refetch } = useQuery({
    queryKey: ["recent-events"],
    queryFn: async () => {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      const { data, error } = await supabase
        .from("events")
        .select("*, profiles(role), event_participants(user_id)")
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
      refetch();
    } catch (error) {
      console.error("Error joining event:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось присоединиться к мероприятию",
      });
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Мероприятие успешно удалено",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить мероприятие",
      });
    }
  };

  const isUserParticipant = (event: any) => {
    return event.event_participants?.some((p: any) => p.user_id === session?.user?.id);
  };

  const isEmployee = (event: any) => {
    return event.profiles?.role === 'employee' && event.author_id === session?.user?.id;
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
                {event.image_url && (
                  <div className="mb-4">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                )}
                <p className="text-gray-600 line-clamp-3">{event.description}</p>
                <p className="text-sm font-semibold text-primary mt-4">
                  {new Date(event.date).toLocaleDateString("ru-RU")}
                </p>
                {event.participants_limit && (
                  <p className="text-sm text-gray-500 mt-2">
                    Участники: {event.current_participants} / {event.participants_limit}
                  </p>
                )}
                {isEmployee(event) ? (
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleDelete(event.id)}
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
                ) : (
                  session?.user?.id && !isUserParticipant(event) && (
                    <Button
                      onClick={() => handleJoin(event.id)}
                      disabled={event.participants_limit && event.current_participants >= event.participants_limit}
                      className="w-full mt-4"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Присоединиться
                    </Button>
                  )
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