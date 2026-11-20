"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "Active Member" | "Channel Admin";
  status: "online" | "busy" | "away";
  tier: string;
  avatarUrl: string;
  channelsCount: number;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, role?: "Active Member" | "Channel Admin") => void;
  logout: () => void;
  switchRole: () => void;
  setStatus: (status: "online" | "busy" | "away") => void;
}

const DEMO_USER: UserSession = {
  id: "usr_chat_404",
  name: "Kai Sterling",
  email: "kai.sterling@pulsechat.net",
  role: "Active Member",
  status: "online",
  tier: "Core Engineering Team",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  channelsCount: 6,
};

const DEMO_ADMIN: UserSession = {
  id: "usr_chat_001",
  name: "Maya Lin",
  email: "maya.admin@pulsechat.net",
  role: "Channel Admin",
  status: "online",
  tier: "Workspace Administrator",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  channelsCount: 12,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
  setStatus: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pulsechat_auth_session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(DEMO_USER);
      }
    } else {
      setUser(DEMO_USER);
    }
  }, []);

  const login = (email: string, name?: string, role: "Active Member" | "Channel Admin" = "Active Member") => {
    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      role,
      status: "online",
      tier: role === "Channel Admin" ? "Workspace Administrator" : "Standard Contributor",
      avatarUrl: DEMO_USER.avatarUrl,
      channelsCount: 3,
    };
    setUser(newUser);
    localStorage.setItem("pulsechat_auth_session", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pulsechat_auth_session");
  };

  const switchRole = () => {
    setUser((prev) => {
      const next = prev?.role === "Channel Admin" ? DEMO_USER : DEMO_ADMIN;
      localStorage.setItem("pulsechat_auth_session", JSON.stringify(next));
      return next;
    });
  };

  const setStatus = (status: "online" | "busy" | "away") => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, status };
      localStorage.setItem("pulsechat_auth_session", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole, setStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
