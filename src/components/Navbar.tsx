import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, LogOut, Plane, Package, Calendar, CreditCard } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-primary">
          BookForMe.Online
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/tickets">
                <Button variant="ghost" size="sm">
                  <Plane className="mr-2 h-4 w-4" />
                  Flight Tickets
                </Button>
              </Link>
              <Link to="/activities">
                <Button variant="ghost" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Tours & Activities
                </Button>
              </Link>
              <Link to="/essentials">
                <Button variant="ghost" size="sm">
                  <Package className="mr-2 h-4 w-4" />
                  Essentials
                </Button>
              </Link>
              <Link to="/budget">
                <Button variant="ghost" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Budget
                </Button>
              </Link>
              <Link to="/account">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};