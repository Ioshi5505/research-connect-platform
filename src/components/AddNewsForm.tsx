import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен"),
  content: z.string().min(1, "Содержание обязательно"),
});

export const AddNewsForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Вы должны быть авторизованы",
        });
        return;
      }

      const { error } = await supabase.from("news").insert({
        title: values.title,
        content: values.content,
        author_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Новость успешно добавлена",
      });

      form.reset();
    } catch (error) {
      console.error("Error adding news:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось добавить новость",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder="Введите заголовок..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Содержание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Введите содержание новости..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Добавить новость
        </Button>
      </form>
    </Form>
  );
};