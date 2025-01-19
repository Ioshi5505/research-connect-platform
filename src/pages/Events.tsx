import { useState } from "react";
import { EventsSection } from "@/components/EventsSection";
import { Navbar } from "@/components/Navbar";
import { EventsManagement } from "@/components/EventsManagement";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Events = () => {
  const session = useSession();
  const { data: userRole } = useQuery({
    queryKey: ["user-role", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) throw error;
      return data?.role || null;
    },
    enabled: !!session?.user?.id,
  });

  const isEmployee = userRole === "employee";

  return (
    <div className="min-h-screen">
      <Navbar />
      {isEmployee ? <EventsManagement /> : <EventsSection />}
    </div>
  );
};

export default Events;