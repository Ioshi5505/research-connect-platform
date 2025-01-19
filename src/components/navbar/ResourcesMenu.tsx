import { Link } from "react-router-dom";
import { ChevronDown, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResourcesMenuProps {
  isEmployee?: boolean;
}

export const ResourcesMenu = ({ isEmployee }: ResourcesMenuProps) => {
  const resourcesMenuItems = [
    { path: "/council", label: "Управляющий совет" },
    { path: "/documents", label: "Документы" },
    { path: "/contacts", label: "Контакты" },
  ];

  // Add user management item for employees
  if (isEmployee) {
    resourcesMenuItems.push({
      path: "/user-management",
      label: "Управление учётками",
      icon: UserCog,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          Ресурсы
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {resourcesMenuItems.map((item) => (
          <DropdownMenuItem key={item.path} asChild>
            <Link to={item.path} className="w-full flex items-center gap-2">
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};