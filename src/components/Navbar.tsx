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

  const { data: userProfile } = useQuery({
    queryKey: ["user-profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

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
              <MainMenu userProfile={userProfile} />
              <ResourcesMenu />
            </div>

            <MobileMenu userProfile={userProfile} />
          </div>
          
          <UserMenu session={!!session} userProfile={userProfile} />
        </div>
      </div>
    </nav>
  );
};