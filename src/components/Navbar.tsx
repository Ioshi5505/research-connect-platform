import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MainMenu } from "./navbar/MainMenu";
import { ResourcesMenu } from "./navbar/ResourcesMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { UserMenu } from "./navbar/UserMenu";

export const Navbar = () => {
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
      
      console.log("User role data:", data); // Debug log
      return data?.role || null;
    },
    enabled: !!session?.user?.id,
  });

  const isEmployee = userRole === 'employee';
  console.log("Is employee:", isEmployee); // Debug log

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/d457d329-afed-4a9d-b31e-49412a64a9c7.png" 
                alt="СНО РГУ СоцТех Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-serif font-bold text-primary hidden sm:inline">
                СНО РГУСоцтех
              </span>
            </Link>
            
            <div className="hidden md:flex items-center ml-8 space-x-4">
              <MainMenu isEmployee={isEmployee} />
              <ResourcesMenu />
            </div>

            <MobileMenu isEmployee={isEmployee} />
          </div>
          
          <UserMenu session={!!session} isEmployee={isEmployee} />
        </div>
      </div>
    </nav>
  );
};