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
import { Image } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен"),
  content: z.string().min(1, "Содержание обязательно"),
  image: z.instanceof(FileList).optional(),
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

      let imageUrl = null;

      if (values.image && values.image[0]) {
        const file = values.image[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      // First, check if the user's profile exists
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      console.log("Profile check result:", { profile, profileError });

      if (!profile) {
        console.log("Creating new profile for user:", user.id);
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            role: "student",
          });

        if (insertError) {
          console.error("Error creating profile:", insertError);
          throw new Error("Failed to create user profile");
        }
        console.log("Profile created successfully");
      }

      const { error } = await supabase.from("news").insert({
        title: values.title,
        content: values.content,
        author_id: user.id,
        image_url: imageUrl,
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
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Изображение</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files)}
                    {...field}
                  />
                  {value && value[0] && (
                    <div className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      <span className="text-sm text-gray-500">
                        {value[0].name}
                      </span>
                    </div>
                  )}
                </div>
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