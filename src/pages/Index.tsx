import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { Navbar } from "@/components/Navbar";
import { EventsCarousel } from "@/components/EventsCarousel";
import { Footer } from "@/components/Footer";
import { UserRoleManagement } from "@/components/UserRoleManagement";

const Index = () => {
  const session = useSession();

  const { data: userRole } = useQuery({
    queryKey: ["user-role", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      console.log("Fetching user role for:", session.user.id);
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        throw error;
      }
      
      console.log("User role data:", data);
      return data?.role || null;
    },
    enabled: !!session?.user?.id,
  });

  const isEmployee = userRole === 'employee';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <AboutSection />
      <section className="py-16 bg-gradient-to-r from-accent/5 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Предстоящие мероприятия</h2>
          <EventsCarousel />
        </div>
      </section>
      {isEmployee && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UserRoleManagement />
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Index;