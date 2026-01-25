import React, { useState, useEffect, useMemo, createContext, useContext, type ReactNode } from "react";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

type User = { id?: string; email?: string; name?: string } | null;

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  startLoginRedirect: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
      if (res.ok) {
        const payload = await res.json();
        setUser(payload.user ?? null);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const startLoginRedirect = () => {
    window.location.href = `${API_BASE}/auth/better`;
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" });
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
