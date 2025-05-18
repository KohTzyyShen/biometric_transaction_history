// App.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./app/screens/HomeScreen/HomeScreen";
import { useRouter } from 'expo-router';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // 关闭React Navigation自带的header，因为你用BaseScreenLayout里的AppBar了
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
