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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  fullName: z.string().min(1, "ФИО обязательно"),
  email: z.string().email("Введите корректный email"),
  faculty: z.string().min(1, "Факультет обязателен"),
  course: z.string().min(1, "Курс обязателен"),
  title: z.string().min(1, "Тема обязательна"),
  workType: z.enum(["article", "report"], {
    required_error: "Выберите тип работы",
  }),
  scientificField: z.string().min(1, "Научная область обязательна"),
  description: z.string().min(1, "Описание обязательно"),
  workStage: z.enum(["idea", "draft", "complete"], {
    required_error: "Выберите стадию готовности",
  }),
  supportTypes: z.array(z.string()).min(1, "Выберите хотя бы один тип помощи"),
  desiredDeadline: z.string().min(1, "Укажите желаемый срок"),
  specialRequirements: z.string().optional(),
  file: z.instanceof(FileList).optional(),
  dataProcessingConsent: z.boolean().refine((val) => val === true, {
    message: "Необходимо согласие на обработку данных",
  }),
});

export const SupportRequestForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      faculty: "",
      course: "",
      title: "",
      scientificField: "",
      description: "",
      specialRequirements: "",
      supportTypes: [],
      dataProcessingConsent: false,
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

      let fileUrl = null;

      if (values.file && values.file[0]) {
        const file = values.file[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("support_files")
          .upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("support_files")
          .getPublicUrl(fileName);

        fileUrl = publicUrl;
      }

      const { error } = await supabase.from("support_requests").insert({
        full_name: values.fullName,
        email: values.email,
        faculty: values.faculty,
        course: parseInt(values.course),
        title: values.title,
        work_type: values.workType,
        scientific_field: values.scientificField,
        description: values.description,
        work_stage: values.workStage,
        support_types: values.supportTypes,
        desired_deadline: new Date(values.desiredDeadline).toISOString(),
        special_requirements: values.specialRequirements,
        file_url: fileUrl,
        user_id: user.id,
        data_processing_consent: values.dataProcessingConsent,
      });

      if (error) throw error;

      toast({
        title: "Успех",
        description: "Заявка успешно отправлена",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить заявку",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Личные данные</h2>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ФИО</FormLabel>
                <FormControl>
                  <Input placeholder="Введите ФИО..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Введите email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Факультет</FormLabel>
                <FormControl>
                  <Input placeholder="Введите факультет..." {...field} />
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
                <FormControl>
                  <Input type="number" placeholder="Введите курс..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">О работе</h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тема</FormLabel>
                <FormControl>
                  <Input placeholder="Введите тему..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип работы</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип работы" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="article">Статья</SelectItem>
                    <SelectItem value="report">Доклад</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scientificField"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Научная область</FormLabel>
                <FormControl>
                  <Input placeholder="Введите научную область..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Введите описание работы..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Стадия готовности</h2>
          <FormField
            control={form.control}
            name="workStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Стадия</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите стадию готовности" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="idea">Идея</SelectItem>
                    <SelectItem value="draft">Черновик</SelectItem>
                    <SelectItem value="complete">Готовая работа</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Необходимая помощь</h2>
          <FormField
            control={form.control}
            name="supportTypes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Выберите типы помощи</FormLabel>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "editing", label: "Редактура" },
                    { id: "formatting", label: "Оформление" },
                    { id: "publication", label: "Публикация" },
                    { id: "conference", label: "Подготовка к конференции" },
                  ].map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="supportTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Сроки и пожелания</h2>
          <FormField
            control={form.control}
            name="desiredDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Желаемый срок</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Особые требования</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Укажите особые требования..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Файлы</h2>
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Загрузить файл</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => onChange(e.target.files)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dataProcessingConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Согласие на обработку персональных данных
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Отправить заявку
        </Button>
      </form>
    </Form>
  );
};