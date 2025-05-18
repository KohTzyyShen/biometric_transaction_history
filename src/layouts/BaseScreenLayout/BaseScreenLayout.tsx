//src/layouts/BaseScreenLayout/BaseScreenLayout.tsx

/*
用法：

insert 这个：
<BaseScreenLayout appBarConfig={appBarConfig}>
      <Text>Welcome to Home Screen!</Text>
    </BaseScreenLayout>
*/

import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppBar from "../AppBar/AppBar";
import { AppBarConfig } from "../AppBar/AppBarConfig";

import styles from "./BaseScreenLayout.styles";

import {
  Radius,
  Alignment,
  Color,
  IconMap,
  UnifiedColor,
  gradientBackground,
  Icon,
  Spacing,
  Strings,
  TextStyle,
} from "../../styles";

interface BaseScreenLayoutProps {
  appBarConfig?: AppBarConfig;
  children: React.ReactNode;
}

const BaseScreenLayout: React.FC<BaseScreenLayoutProps> = ({ appBarConfig, children }) => {
  return (
    <SafeAreaView style={styles.container}>
      {appBarConfig && <AppBar config={appBarConfig} />}
    
      {children} 
           
    </SafeAreaView>
  );
};

export default BaseScreenLayout;
