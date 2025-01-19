import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, Trash2, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";

interface EventsSectionProps {
  hideAddButton?: boolean;
}

export const EventsSection = ({ hideAddButton }: EventsSectionProps) => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*, profiles(role), event_participants(user_id)")
        .order("date", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["events"] });

      toast({
        title: "Успех",
        description: "Мероприятие успешно удалено",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить мероприятие",
      });
    }
  };

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

      const { error: updateError } = await supabase
        .from("events")
        .update({ current_participants: events?.find(e => e.id === eventId)?.current_participants + 1 })
        .eq("id", eventId);

      if (updateError) throw updateError;

      await queryClient.invalidateQueries({ queryKey: ["events"] });

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

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Calendar className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-center">Мероприятия</h2>
        </div>
        
        {isLoading ? (
          <div className="text-center">Загрузка...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  {session?.user?.id === event.author_id && event.profiles?.role === 'employee' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
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
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-primary">
                      {new Date(event.date).toLocaleDateString("ru-RU")}
                    </p>
                    {event.participants_limit && (
                      <p className="text-sm text-gray-500">
                        Участники: {event.current_participants} / {event.participants_limit}
                      </p>
                    )}
                    {session?.user?.id && !isUserParticipant(event) && (
                      <Button
                        onClick={() => handleJoin(event.id)}
                        disabled={event.participants_limit && event.current_participants >= event.participants_limit}
                        className="w-full"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Присоединиться
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};