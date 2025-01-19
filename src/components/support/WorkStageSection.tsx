import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SupportRequestFormValues } from "./types";

interface WorkStageSectionProps {
  form: UseFormReturn<SupportRequestFormValues>;
}

export const WorkStageSection = ({ form }: WorkStageSectionProps) => {
  return (
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
  );
};