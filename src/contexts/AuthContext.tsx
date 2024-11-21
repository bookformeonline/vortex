import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Demo kullanıcı için otomatik giriş
  useEffect(() => {
    const demoUser = {
      id: "demo123",
      email: "demo@example.com",
      name: "Demo Kullanıcı",
    };
    setUser(demoUser);
    toast({ 
      title: "Demo hesabına giriş yapıldı",
      description: "Hoş geldiniz, Demo Kullanıcı!" 
    });
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      setUser({ id: "1", email, name: "John Doe" });
      toast({ title: "Tekrar hoş geldiniz!" });
    } catch (error) {
      toast({ title: "Giriş yapılırken hata oluştu", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      setUser({ id: "1", email, name });
      toast({ title: "TravelPlanner'a hoş geldiniz!" });
    } catch (error) {
      toast({ title: "Kayıt olurken hata oluştu", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    toast({ title: "Başarıyla çıkış yapıldı" });
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