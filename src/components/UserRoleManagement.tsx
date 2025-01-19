import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

type Profile = {
  id: string;
  role: "student" | "employee";
  created_at: string;
  auth_users: {
    email: string;
  } | null;
};

export const UserRoleManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: users, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      console.log("Fetching profiles...");
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select(`
          *,
          auth_users:id(
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        throw profilesError;
      }

      console.log("Fetched profiles:", profiles);
      return profiles as Profile[];
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: "student" | "employee" }) => {
      setLoading(true);
      console.log("Updating role for user:", userId, "to:", newRole);
      
      const { data, error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) {
        console.error("Error updating role:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast({
        title: "Роль успешно обновлена",
        description: "Изменения вступят в силу немедленно",
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Ошибка при обновлении роли",
        description: "Пожалуйста, попробуйте снова позже",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleRoleChange = async (userId: string, currentRole: "student" | "employee") => {
    const newRole = currentRole === "student" ? "employee" : "student";
    await updateRoleMutation.mutateAsync({ userId, newRole });
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Управление ролями пользователей</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Дата регистрации</TableHead>
            <TableHead>Текущая роль</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.auth_users?.email}</TableCell>
              <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className={user.role === "employee" ? "text-green-600" : "text-blue-600"}>
                  {user.role === "employee" ? "Сотрудник" : "Студент"}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleRoleChange(user.id, user.role)}
                  disabled={loading}
                >
                  {user.role === "student" ? "Сделать сотрудником" : "Сделать студентом"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};