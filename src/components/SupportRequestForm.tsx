import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { PersonalInfoSection } from "./support/PersonalInfoSection";
import { WorkDetailsSection } from "./support/WorkDetailsSection";
import { WorkStageSection } from "./support/WorkStageSection";
import { SupportTypesSection } from "./support/SupportTypesSection";
import { DeadlinesSection } from "./support/DeadlinesSection";
import { FileUploadSection } from "./support/FileUploadSection";
import { ConsentSection } from "./support/ConsentSection";
import { formSchema, type SupportRequestFormValues } from "./support/types";

export const SupportRequestForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SupportRequestFormValues>({
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

  const onSubmit = async (values: SupportRequestFormValues) => {
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
        <PersonalInfoSection form={form} />
        <WorkDetailsSection form={form} />
        <WorkStageSection form={form} />
        <SupportTypesSection form={form} />
        <DeadlinesSection form={form} />
        <FileUploadSection form={form} />
        <ConsentSection form={form} />
        <Button type="submit" className="w-full">
          Отправить заявку
        </Button>
      </form>
    </Form>
  );
};