import React, { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login for now
      setUser({ id: "1", email, name: "John Doe" });
      toast({ title: "Welcome back!" });
    } catch (error) {
      toast({ title: "Error logging in", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Mock registration for now
      setUser({ id: "1", email, name });
      toast({ title: "Welcome to TravelPlanner!" });
    } catch (error) {
      toast({ title: "Error registering", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    toast({ title: "Logged out successfully" });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};