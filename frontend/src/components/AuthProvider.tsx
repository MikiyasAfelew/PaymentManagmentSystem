"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  signIn: (email: string, redirectPath?: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_SESSION_KEY = "paymanager-demo-session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(DEMO_SESSION_KEY);
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setIsAuthenticated(true);
        setUser(session);
      } catch (e) {
        localStorage.removeItem(DEMO_SESSION_KEY);
      }
    }
    setMounted(true);
  }, []);

  const signIn = (email: string, redirectPath?: string) => {
    // Demo authentication - accepts any email
    const demoUser = {
      email,
      name: email.split("@")[0]
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
    };

    setIsAuthenticated(true);
    setUser(demoUser);
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoUser));

    // Set cookie for middleware detection
    document.cookie = `${DEMO_SESSION_KEY}=true; path=/; max-age=2592000`; // 30 days

    // Redirect to the originally requested page or dashboard
    if (redirectPath) {
      window.location.href = redirectPath;
    } else {
      window.location.href = "/dashboard";
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(DEMO_SESSION_KEY);

    // Clear cookie
    document.cookie = `${DEMO_SESSION_KEY}=; path=/; max-age=0`;

    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
