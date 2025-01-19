import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { SupportRequestFormValues } from "./types";

interface DeadlinesSectionProps {
  form: UseFormReturn<SupportRequestFormValues>;
}

export const DeadlinesSection = ({ form }: DeadlinesSectionProps) => {
  return (
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
  );
};