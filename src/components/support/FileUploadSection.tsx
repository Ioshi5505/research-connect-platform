import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SupportRequestFormValues } from "./types";

interface FileUploadSectionProps {
  form: UseFormReturn<SupportRequestFormValues>;
}

export const FileUploadSection = ({ form }: FileUploadSectionProps) => {
  return (
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
  );
};