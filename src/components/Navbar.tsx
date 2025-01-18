import { Link, useNavigate } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

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
              <span className="text-xl font-serif font-bold text-primary hidden sm:inline">СНО РГУСоцтех</span>
            </Link>
            
            <div className="hidden md:flex items-center ml-8 space-x-4">
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
                      <Link to={item.path} className="w-full">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu */}
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
          </div>
          
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-foreground hover:text-accent transition-colors"
                >
                  Профиль
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Выйти</span>
                </Button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-foreground hover:text-accent transition-colors"
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};