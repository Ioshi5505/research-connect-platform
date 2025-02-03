import { useQuery } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export const ResourcesMenu = () => {
  const session = useSession();

  const { data: profile } = useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const isEmployee = profile?.role === "employee";

  let resourcesMenuItems = [
    { path: "/council", label: "Совет молодых ученых" },
    { path: "/documents", label: "Документы" },
    { path: "/support", label: isEmployee ? "Заявки" : "Подать заявку" },
    { path: "/contacts", label: "Контакты" },
  ];

  if (isEmployee) {
    resourcesMenuItems = resourcesMenuItems.map(item => 
      item.path === "/support" 
        ? { path: "/received-requests", label: "Полученные заявки" }
        : item
    );
  }

  if (isEmployee) {
    resourcesMenuItems.push({
      path: "/user-management",
      label: "Управление пользователями",
    });
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {resourcesMenuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link to={item.path}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};