import { Navbar } from "@/components/Navbar";
import { SupportRequestForm } from "@/components/SupportRequestForm";
import { EmployeeRequestsSection } from "@/components/support/EmployeeRequestsSection";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Support = () => {
  const session = useSession();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const isEmployee = profile?.role === "employee";

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">
          {isEmployee ? "Заявки на сопровождение" : "Заявка на сопровождение"}
        </h1>
        <div className="bg-card p-6 rounded-lg shadow">
          {isEmployee ? <EmployeeRequestsSection /> : <SupportRequestForm />}
        </div>
      </div>
    </div>
  );
};

export default Support;