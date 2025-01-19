import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { SupportRequestFormValues } from "./types";

interface ConsentSectionProps {
  form: UseFormReturn<SupportRequestFormValues>;
}

export const ConsentSection = ({ form }: ConsentSectionProps) => {
  return (
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
  );
};