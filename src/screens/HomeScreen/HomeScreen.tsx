//src/screens/HomeScreen/HomeScreen.tsx

import React from "react";
import { Text } from "react-native";
import BaseScreenLayout from "../../layouts/BaseScreenLayout/BaseScreenLayout";
import { AppBarConfig } from "../../layouts/AppBar/AppBarConfig";

import { gradientBackground,TextStyle } from "../../styles";

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
  return (
    <LinearGradient {...gradientBackground} style={{ flex: 1 }}>
    <BaseScreenLayout appBarConfig={appBarConfig}>
    <Text style={TextStyle.appBar}>这是标题1</Text>    
    </BaseScreenLayout>
    </LinearGradient>
  );
};
 
export default HomeScreen;
