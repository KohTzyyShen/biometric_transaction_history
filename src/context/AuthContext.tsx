// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: () => void;
  resetAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  authenticate: () => {},
  resetAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = () => setIsAuthenticated(true);
  const resetAuth = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
