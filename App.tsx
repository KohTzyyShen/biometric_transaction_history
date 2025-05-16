import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import TransactionHistoryScreen from "./src/screens/TransactionHistoryScreen";
import PasscodeScreen from "./src/screens/PasscodeScreen";
import ForgotPasscodeScreen from "./src/screens/ForgotPasscodeScreen"; // ✅ 加上这一行


import { UserProvider } from "./src/context/UserContext";
import { AuthProvider } from "./src/context/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function AppInner() {
  useEffect(() => {
    const resetAuth = async () => {
      await AsyncStorage.removeItem("authenticated");
    };
    resetAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Passcode" component={PasscodeScreen} />
        <Stack.Screen name="ForgotPasscode" component={ForgotPasscodeScreen} />

        <Stack.Screen
          name="Transaction History"
          component={TransactionHistoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </UserProvider>
  );
}
