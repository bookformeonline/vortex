import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, LogOut, Map } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-primary">
          TravelPlanner
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/planner">
                <Button variant="ghost" size="sm">
                  <Map className="mr-2 h-4 w-4" />
                  Seyahat Planla
                </Button>
              </Link>
              <Link to="/account">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Hesabım
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Giriş</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Kayıt Ol</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};