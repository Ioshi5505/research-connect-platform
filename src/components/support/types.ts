import { z } from "zod";
import { SUPPORT_TYPES } from "./SupportTypesSection";

export type SupportType = typeof SUPPORT_TYPES[number]['id'];

export const formSchema = z.object({
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
  supportTypes: z.array(z.enum(["editing", "formatting", "publication", "conference"] as const)).min(1, "Выберите хотя бы один тип помощи"),
  desiredDeadline: z.string().min(1, "Укажите желаемый срок"),
  specialRequirements: z.string().optional(),
  file: z.instanceof(FileList).optional(),
  dataProcessingConsent: z.boolean().refine((val) => val === true, {
    message: "Необходимо согласие на обработку данных",
  }),
});

export type SupportRequestFormValues = z.infer<typeof formSchema>;