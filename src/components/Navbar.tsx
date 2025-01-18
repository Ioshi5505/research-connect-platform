import { Link, useNavigate } from "react-router-dom";
import { Image, LogOut, ChevronDown, Moon, Sun } from "lucide-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useTheme } from "next-themes";
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
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const mainMenuItems = [
    { path: "/", label: "Главная" },
    { path: "/news", label: "Новости" },
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
              <Image className="h-8 w-8 text-primary" />
              <span className="text-xl font-serif font-bold text-primary">СНО РГУСоцтех</span>
            </Link>
            
            <div className="hidden md:flex items-center ml-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    Главное меню
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {mainMenuItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="w-full">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {session?.user?.user_metadata?.role === 'employee' && (
                    <DropdownMenuItem asChild>
                      <Link to="/news/manage" className="w-full">
                        Управление новостями
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 ml-4">
                    Ресурсы
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
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
                  Выйти
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