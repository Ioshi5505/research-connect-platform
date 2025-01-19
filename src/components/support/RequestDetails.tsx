import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface RequestDetailsProps {
  requestId: string;
  onClose: () => void;
}

export const RequestDetails = ({ requestId, onClose }: RequestDetailsProps) => {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: request, isLoading } = useQuery({
    queryKey: ["support-request", requestId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_requests")
        .select("*")
        .eq("id", requestId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const { error } = await supabase
        .from("support_requests")
        .update({ status: newStatus })
        .eq("id", requestId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-requests"] });
      queryClient.invalidateQueries({ queryKey: ["support-request", requestId] });
      toast({
        title: "Статус обновлен",
        description: "Статус заявки успешно обновлен",
      });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (comment: string) => {
      const newComment = {
        text: comment,
        timestamp: new Date().toISOString(),
        author: "employee",
      };

      const { error } = await supabase
        .from("support_requests")
        .update({
          comments: [...(request?.comments || []), newComment],
        })
        .eq("id", requestId);

      if (error) throw error;
    },
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: ["support-request", requestId] });
      toast({
        title: "Комментарий добавлен",
        description: "Ваш комментарий успешно добавлен",
      });
    },
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!request) {
    return <div>Заявка не найдена</div>;
  }

  return (
    <div className="space-y-6 h-[600px] flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{request.title}</h2>
          <p className="text-muted-foreground">
            {format(new Date(request.created_at), "d MMMM yyyy", { locale: ru })}
          </p>
        </div>
        <Select
          value={request.status}
          onValueChange={(value) => updateStatusMutation.mutate(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Новая</SelectItem>
            <SelectItem value="in_progress">В работе</SelectItem>
            <SelectItem value="completed">Завершена</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6">
          <section>
            <h3 className="font-semibold mb-2">Информация о заявителе</h3>
            <div className="space-y-1">
              <p>
                <span className="text-muted-foreground">ФИО:</span>{" "}
                {request.full_name}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {request.email}
              </p>
              <p>
                <span className="text-muted-foreground">Факультет:</span>{" "}
                {request.faculty}
              </p>
              <p>
                <span className="text-muted-foreground">Курс:</span>{" "}
                {request.course}
              </p>
            </div>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Детали работы</h3>
            <div className="space-y-1">
              <p>
                <span className="text-muted-foreground">Тип работы:</span>{" "}
                {request.work_type}
              </p>
              <p>
                <span className="text-muted-foreground">Научная область:</span>{" "}
                {request.scientific_field}
              </p>
              <p>
                <span className="text-muted-foreground">Стадия:</span>{" "}
                {request.work_stage}
              </p>
              <div className="mt-2">
                <span className="text-muted-foreground">Описание:</span>
                <p className="mt-1">{request.description}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Требуемая помощь</h3>
            <div className="flex flex-wrap gap-2">
              {request.support_types.map((type: string) => (
                <Badge key={type} variant="outline">
                  {type}
                </Badge>
              ))}
            </div>
            {request.special_requirements && (
              <div className="mt-2">
                <span className="text-muted-foreground">
                  Особые требования:
                </span>
                <p className="mt-1">{request.special_requirements}</p>
              </div>
            )}
          </section>

          <section>
            <h3 className="font-semibold mb-2">Комментарии</h3>
            <div className="space-y-4">
              {request.comments?.map((comment: any, index: number) => (
                <div
                  key={index}
                  className="bg-muted p-3 rounded-lg space-y-1"
                >
                  <p>{comment.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(comment.timestamp), "d MMMM yyyy HH:mm", {
                      locale: ru,
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>

      <div className="space-y-2">
        <Textarea
          placeholder="Добавить комментарий..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              if (newComment.trim()) {
                addCommentMutation.mutate(newComment);
              }
            }}
          >
            Добавить комментарий
          </Button>
        </div>
      </div>
    </div>
  );
};