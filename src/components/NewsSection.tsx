import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Newspaper, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";

export const NewsSection = ({ hideAddButton = false }: { hideAddButton?: boolean }) => {
  const { data: news, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*, profiles(role)")
        .order("created_at", { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (newsId: string) => {
    try {
      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", newsId);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["news"] });

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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Newspaper className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold">Новости</h2>
        </div>
        
        {isLoading ? (
          <div className="text-center">Загрузка...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news?.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  {session?.user?.id === item.author_id && item.profiles?.role === 'employee' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{item.content}</p>
                  <p className="text-sm text-gray-400 mt-4">
                    {new Date(item.created_at).toLocaleDateString("ru-RU")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};