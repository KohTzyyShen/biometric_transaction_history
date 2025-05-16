// src/screens/HomeScreen.tsx
import React from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, Alert } from "react-native";
import PortfolioData from "../data/Portfolio.json";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }: any) {
  const username = PortfolioData.Login.username;
  const { isAuthenticated, authenticateWithLocalAuth } = useAuth();

  const handleNavigate = async () => {
    if (isAuthenticated) {
      // 已认证直接去交易历史页面
      navigation.navigate("Transaction History", { skipPasscode: false });
      return;
    }

    try {
      const localAuthSuccess = await authenticateWithLocalAuth();
      if (localAuthSuccess) {
        // 生物认证成功
        navigation.navigate("Transaction History", { skipPasscode: false });
      } else {
        // 认证失败，弹窗选择
        Alert.alert(
          "Authentication failed",
          "Would you like to try again or use Passcode?",
          [
            {
              text: "Try Again",
              onPress: handleNavigate,
              style: "cancel",
            },
            {
              text: "Use Passcode",
              onPress: () => navigation.navigate("Passcode"),
            },
          ]
        );
      }
    } catch (error) {
      // 设备不支持或其他异常，直接跳 Passcode
      navigation.navigate("Passcode");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topColumn}>
        <Text style={styles.text1}>Hi {username}</Text>
        <Text style={styles.text2}>How can I help you today</Text>
      </View>

      <View style={styles.centerButton}>
        <Button title="Show my transaction" onPress={handleNavigate} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topColumn: {
    marginTop: 90,
    alignItems: "center",
  },
  text1: {
    color: "#0000e6",
    fontSize: 18,
    marginBottom: 13,
  },
  text2: {
    color: "#4f4f4f",
    fontSize: 16,
  },
  centerButton: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 40,
  },
});
