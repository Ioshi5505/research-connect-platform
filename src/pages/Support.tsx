import { Navbar } from "@/components/Navbar";
import { SupportRequestForm } from "@/components/SupportRequestForm";
import { EmployeeRequestsSection } from "@/components/support/EmployeeRequestsSection";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Support = () => {
  const session = useSession();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      console.log("Fetching profile for user:", session.user.id);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      
      console.log("Profile data:", data);
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const isEmployee = profile?.role === "employee";
  console.log("Is employee:", isEmployee);

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

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

  if (!session) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Пожалуйста, войдите в систему
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">
          {isEmployee ? "Полученные заявки" : "Заявка на сопровождение"}
        </h1>
        <div className="bg-card p-6 rounded-lg shadow">
          {isEmployee ? <EmployeeRequestsSection /> : <SupportRequestForm />}
        </div>
      </div>
    </div>
  );
};

export default Support;