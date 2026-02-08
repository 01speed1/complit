import { useState, useEffect, useMemo, createContext, useContext, type ReactNode } from "react";
import type { User } from "@complit/api-client";
import { api } from "@/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  startLoginRedirect: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = await api.auth.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const startLoginRedirect = () => {
    window.location.href = api.auth.getLoginUrl();
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.auth.logout();
      setUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, isLoading, startLoginRedirect, logout, refreshUser }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useGoogleAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useGoogleAuth must be used within an AuthProvider");
  return ctx;
};
