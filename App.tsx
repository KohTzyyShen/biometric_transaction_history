// App.tsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import TransactionHistoryScreen from "./src/screens/TransactionHistoryScreen";
import PasscodeScreen from "./src/screens/PasscodeScreen";

import { UserProvider } from "./src/context/UserContext";
import { AuthProvider } from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Passcode" component={PasscodeScreen} />
            <Stack.Screen
              name="Transaction History"
              component={TransactionHistoryScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </UserProvider>
  );
}
