import { Link, useNavigate } from "react-router-dom";
import { Image, LogOut } from "lucide-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Image className="h-8 w-8 text-primary" />
            <span className="text-xl font-serif font-bold text-primary">СНО РГУСоцтех</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/news" className="text-gray-700 hover:text-primary">Новости</Link>
            {session && (
              <Link to="/news/manage" className="text-gray-700 hover:text-primary">
                Управление новостями
              </Link>
            )}
            <Link to="/events" className="text-gray-700 hover:text-primary">Мероприятия</Link>
            {session ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </Button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary">
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};