import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SupportRequestFormValues } from "./types";

interface WorkDetailsSectionProps {
  form: UseFormReturn<SupportRequestFormValues>;
}

export const WorkDetailsSection = ({ form }: WorkDetailsSectionProps) => {
  return (
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
  );
};