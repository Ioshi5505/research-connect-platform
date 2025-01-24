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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  fullName: z.string().min(1, "ФИО обязательно"),
  course: z.string().min(1, "Курс обязателен"),
  studyGroup: z.string().min(1, "Группа обязательна"),
  educationForm: z.string().min(1, "Форма обучения обязательна"),
  degreeType: z.string().min(1, "Степень образования обязательна"),
});

interface JoinEventFormProps {
  eventId: string;
}

export const JoinEventForm = ({ eventId }: JoinEventFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      course: "1",
      studyGroup: "",
      educationForm: "full_time",
      degreeType: "bachelor",
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

      const { error } = await supabase.from("event_participants").insert({
        event_id: eventId,
        user_id: user.id,
        full_name: values.fullName,
        course: parseInt(values.course),
        study_group: values.studyGroup,
        education_form: values.educationForm,
        degree_type: values.degreeType,
      });

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Вы успешно присоединились к мероприятию",
      });

      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("Error joining event:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось присоединиться к мероприятию",
      });
    }
  };

  const getEducationForm = (form: string) => {
    switch (form) {
      case "full_time":
        return "Очная";
      case "part_time":
        return "Заочная";
      case "distance":
        return "Дистанционная";
      default:
        return form;
    }
  };

  const getDegreeType = (type: string) => {
    switch (type) {
      case "bachelor":
        return "Бакалавриат";
      case "master":
        return "Магистратура";
      case "specialist":
        return "Специалитет";
      case "postgraduate":
        return "Аспирантура";
      default:
        return type;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО</FormLabel>
              <FormControl>
                <Input placeholder="Введите ваше ФИО..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Курс</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите курс" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((course) => (
                    <SelectItem key={course} value={course.toString()}>
                      {course} курс
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studyGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Группа</FormLabel>
              <FormControl>
                <Input placeholder="Введите вашу группу..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="educationForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Форма обучения</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите форму обучения" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full_time">Очная</SelectItem>
                  <SelectItem value="part_time">Заочная</SelectItem>
                  <SelectItem value="distance">Дистанционная</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="degreeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Степень образования</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите степень образования" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bachelor">Бакалавриат</SelectItem>
                  <SelectItem value="master">Магистратура</SelectItem>
                  <SelectItem value="specialist">Специалитет</SelectItem>
                  <SelectItem value="postgraduate">Аспирантура</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Присоединиться к мероприятию
        </Button>
      </form>
    </Form>
  );
};