import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, LogOut, Plane, Package, Calendar, CreditCard } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-r h-screen w-64 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        <Link to="/" className="p-4 text-xl font-bold text-primary border-b">
          BookForMe.Online
        </Link>
        
        <div className="flex flex-col p-4 space-y-2">
          {user ? (
            <>
              <Link to="/tickets">
                <Button variant="ghost" className="w-full justify-start">
                  <Plane className="mr-2 h-4 w-4" />
                  Flight Tickets
                </Button>
              </Link>
              <Link to="/activities">
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Tours & Activities
                </Button>
              </Link>
              <Link to="/essentials">
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Essentials
                </Button>
              </Link>
              <Link to="/budget">
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Budget
                </Button>
              </Link>
              <Link to="/account">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600" 
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="w-full justify-start">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full justify-start">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};