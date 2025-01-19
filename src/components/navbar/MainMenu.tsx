import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainMenuProps {
  isEmployee?: boolean;
}

export const MainMenu = ({ isEmployee }: MainMenuProps) => {
  const mainMenuItems = [
    { path: "/", label: "Главная" },
    { path: "/events", label: "Мероприятия" },
  ];

  if (isEmployee) {
    mainMenuItems.push({
      path: "/support",
      label: "Полученные заявки",
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          Главное меню
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {mainMenuItems.map((item) => (
          <DropdownMenuItem key={item.path} asChild>
            <Link to={item.path} className="w-full">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};