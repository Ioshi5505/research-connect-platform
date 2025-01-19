import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile } from "@/integrations/supabase/types";

interface MobileMenuProps {
  userProfile: Profile | null;
}

export const MobileMenu = ({ userProfile }: MobileMenuProps) => {
  const mainMenuItems = [
    { path: "/", label: "Главная" },
    { path: "/events", label: "Мероприятия" },
  ];

  const resourcesMenuItems = [
    { path: "/council", label: "Управляющий совет" },
    { path: "/documents", label: "Документы" },
    { path: "/support", label: "Заявка на сопровождение" },
    { path: "/contacts", label: "Контакты" },
  ];

  if (userProfile?.role === 'employee') {
    mainMenuItems.push({
      path: "/support",
      label: "Полученные заявки",
    });
  }

  return (
    <div className="md:hidden flex items-center ml-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            Меню
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {mainMenuItems.map((item) => (
            <DropdownMenuItem key={item.path} asChild>
              <Link to={item.path} className="w-full">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
          {resourcesMenuItems.map((item) => (
            <DropdownMenuItem key={item.path} asChild>
              <Link to={item.path} className="w-full">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};