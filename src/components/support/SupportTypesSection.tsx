import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { SupportRequestFormValues } from "./types";

export const SUPPORT_TYPES = [
  { id: "editing" as const, label: "Редактура" },
  { id: "formatting" as const, label: "Оформление" },
  { id: "publication" as const, label: "Публикация" },
  { id: "conference" as const, label: "Подготовка к конференции" },
] as const;

interface SupportTypesSectionProps {
  form: UseFormReturn<SupportRequestFormValues>;
}

export const SupportTypesSection = ({ form }: SupportTypesSectionProps) => {
  return (
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
              {SUPPORT_TYPES.map((item) => (
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
  );
};