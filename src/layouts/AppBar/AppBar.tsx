//src/layouts/AppBar.tsx

/*
用法：
引用appbar


使用appbar
const App = () => {
  const appBarConfig = {
    iconBoolean: true,
    iconName: "deleteicon",
    leftTextBoolean: true,
    leftText: "Home",
    rightTextBoolean: true,
    rightText: "Edit"
  } as const;;

 <AppBar config={appBarConfig} />
*/

import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./AppBar.styles";
import { AppBarConfig } from "./AppBarConfig";


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


interface Props {
  config: AppBarConfig;
}

const AppBar: React.FC<Props> = ({ config }) => {
  const {
    iconBoolean,
    iconName,
    leftTextBoolean,
    leftText,
    rightTextBoolean,
    rightText,
  } = config;
  
  return (
    <SafeAreaView style={styles.container}>
      
      <View
        style={styles.contentWrapper}
      >
        <View
          style={styles.leftGroup}
        >
          {iconBoolean && iconName && <Icon name={iconName} />}
          {leftTextBoolean && leftText && (
            <Text
              style={styles.leftGroupText}
            >
              {leftText}
            </Text>
          )}
        </View>

        {rightTextBoolean && rightText && (
          <Text style={styles.rightText}>
            {rightText}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AppBar;
