//app/index.tsx

import React from "react";
import { Text, View, Button } from "react-native";
import BaseScreenLayout from "../src/layouts/BaseScreenLayout/BaseScreenLayout";
import { AppBarConfig } from "../src/layouts/AppBar/AppBarConfig";
import { useRouter } from 'expo-router';

import { gradientBackground,TextStyle } from "../src/styles";

import { LinearGradient } from "expo-linear-gradient";



const appBarConfig: AppBarConfig = {
 iconBoolean: true,
  iconName: "backIcon", 
  leftTextBoolean: true,
  leftText: "Home",
  rightTextBoolean: true,
  rightText: "Skip",
};

const HomeScreen = () => {
    const router = useRouter(); 

  return (
    <LinearGradient {...gradientBackground} style={{ flex: 1 }}>
    <BaseScreenLayout appBarConfig={appBarConfig}>
      <Button title="Go to Transaction History" onPress={() => router.navigate('/TransactionHistory')} />
    </BaseScreenLayout>
    </LinearGradient>
  );
};
 
export default HomeScreen;
