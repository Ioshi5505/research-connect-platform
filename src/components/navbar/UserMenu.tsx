import { Link, useNavigate } from "react-router-dom";
import { LogOut, Inbox } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  session: boolean;
  isEmployee?: boolean;
}

export const UserMenu = ({ session, isEmployee }: UserMenuProps) => {
  const supabaseClient = useSupabaseClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate('/login');
  };

  console.log("UserMenu - isEmployee:", isEmployee); // Debug log

  return (
    <div className="flex items-center space-x-4">
      {isEmployee && (
        <Link 
          to="/support-requests" 
          className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
        >
          <Inbox className="h-4 w-4" />
          <span className="hidden sm:inline">Полученные заявки</span>
        </Link>
      )}
      {!isEmployee && session && (
        <Link 
          to="/support" 
          className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
        >
          <Inbox className="h-4 w-4" />
          <span className="hidden sm:inline">Заявка на сопровождение</span>
        </Link>
      )}
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
  );
};