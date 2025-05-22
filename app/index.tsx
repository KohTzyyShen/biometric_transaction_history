//app/index.tsx

import React from "react";
import { Text, View, Button } from "react-native";
import BaseScreenLayout from "../src/layouts/BaseScreenLayout/BaseScreenLayout";
import { AppBarConfig } from "../src/layouts/AppBar/AppBarConfig";
import { useRouter } from 'expo-router';
import Strings from '../src/styles/String';
import styles from '../src/screens/HomeScreen/HomeScreen.styles'

import { gradientBackground,TextStyle } from "../src/styles";

import { LinearGradient } from "expo-linear-gradient";
import BottomButton from '../src/components/BottomButton/BottomButton';

const appBarConfig: AppBarConfig = {
 iconBoolean: false,
  iconName: "backIcon", 
  leftTextBoolean: false,
  leftText: "Home",
  rightTextBoolean: false,
  rightText: "Skip",
};

const HomeScreen = () => {
    const router = useRouter(); 

  return (
    <LinearGradient {...gradientBackground} style={{ flex: 1 }}>
    <BaseScreenLayout appBarConfig={appBarConfig}>
 <View style={styles.container}> 
    <View style={styles.title}> 
      <Text style={styles.GreetingUser}>{Strings.greeting}</Text>{/*color primary, text1*/}
      <Text style={styles.GreetingText}>{Strings.greeting2}</Text>{/*color primary, text3*/}
    </View>

    <BottomButton
  title={Strings.homeScreenButton}
  onPress={() =>  router.push('/TransactionHistory')}
/>
</View>
    </BaseScreenLayout>
    </LinearGradient>
  );
};
 
export default HomeScreen;
