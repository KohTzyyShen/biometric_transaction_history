// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: () => Promise<void>;
  resetAuth: () => Promise<void>;
  authenticateWithLocalAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  authenticate: async () => {},
  resetAuth: async () => {},
  authenticateWithLocalAuth: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const authenticateWithLocalAuth = async (): Promise<boolean> => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      
      return false;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Biometric Authenticate",
      fallbackLabel: "Use Passcode",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (result.success) {
      await authenticate();
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        resetAuth,
        authenticateWithLocalAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
