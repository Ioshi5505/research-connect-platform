import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SupportRequestFormValues } from "./types";

interface PersonalInfoSectionProps {
  form: UseFormReturn<SupportRequestFormValues>;
}

export const PersonalInfoSection = ({ form }: PersonalInfoSectionProps) => {
  return (
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
  );
};