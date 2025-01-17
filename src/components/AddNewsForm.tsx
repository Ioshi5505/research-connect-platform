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
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен"),
  content: z.string().min(1, "Содержание обязательно"),
});

export const AddNewsForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
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

      // First, check if the user's profile exists
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      console.log("Profile check result:", { profile, profileError });

      if (!profile) {
        console.log("Creating new profile for user:", user.id);
        // Create profile if it doesn't exist
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            role: "student", // Default role
          });

        if (insertError) {
          console.error("Error creating profile:", insertError);
          throw new Error("Failed to create user profile");
        }
        console.log("Profile created successfully");
      }

      // Now insert the news
      const { error } = await supabase.from("news").insert({
        title: values.title,
        content: values.content,
        author_id: user.id,
      });

      if (error) {
        console.error("Error details:", error);
        throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ["news"] });

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
        description: "Не удалось добавить новость. Проверьте, что у вас есть права на добавление новостей.",
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