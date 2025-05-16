// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: () => Promise<void>;
  resetAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  authenticate: async () => {},
  resetAuth: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初次加载时检查 AsyncStorage 是否存有认证状态
  useEffect(() => {
    const loadAuthState = async () => {
      const storedAuth = await AsyncStorage.getItem("authenticated");
      setIsAuthenticated(storedAuth === "true");
    };

    loadAuthState();
  }, []);

  const authenticate = async () => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem("authenticated", "true");
  };

  const resetAuth = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("authenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
