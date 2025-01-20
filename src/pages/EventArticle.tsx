import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2, UserPlus } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EventArticle = () => {
  const { id } = useParams();
  const session = useSession();
  const { toast } = useToast();
  console.log('Fetching event with id:', id);

  const { data: event, isLoading, error, refetch } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*, profiles(role), event_participants(user_id)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching event:', error);
        throw error;
      }

      console.log('Fetched event:', data);
      return data;
    },
    enabled: !!id,
  });

  const handleJoin = async () => {
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
          event_id: id,
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

  const isUserParticipant = event?.event_participants?.some(
    (p: any) => p.user_id === session?.user?.id
  );

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
            Произошла ошибка при загрузке мероприятия
          </div>
        ) : event ? (
          <article className="max-w-4xl mx-auto">
            {event.image_url && (
              <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <div className="text-muted-foreground mb-4">
              {format(new Date(event.date), 'dd.MM.yyyy HH:mm')}
            </div>
            {event.participants_limit && (
              <div className="text-muted-foreground mb-8">
                Участники: {event.current_participants} / {event.participants_limit}
              </div>
            )}
            <div className="prose prose-invert max-w-none mb-8">
              {event.description}
            </div>
            {session?.user?.id && !isUserParticipant && (
              <Button
                onClick={handleJoin}
                disabled={
                  event.participants_limit &&
                  event.current_participants >= event.participants_limit
                }
                className="w-full md:w-auto"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Присоединиться
              </Button>
            )}
          </article>
        ) : (
          <div className="text-center">
            Мероприятие не найдено
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EventArticle;