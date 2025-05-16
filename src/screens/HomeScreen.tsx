import React from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, Alert } from "react-native";
import PortfolioData from "../data/Portfolio.json";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import strings from "../constants/strings";



export default function HomeScreen({ navigation }: any) {
  const username = PortfolioData.Login.username;
  const { isAuthenticated, authenticateWithLocalAuth } = useAuth();

  const handleNavigate = async () => {
    if (isAuthenticated) {
      navigation.navigate("Transaction History", { skipPasscode: false });
      return;
    }

    try {
      const localAuthSuccess = await authenticateWithLocalAuth();
      if (localAuthSuccess) {
        navigation.navigate("Transaction History", { skipPasscode: false });
      } else {
        Alert.alert(
          "Authentication failed",
          "Would you like to try again or use Passcode?",
          [
            { text: "Try Again", onPress: handleNavigate, style: "cancel" },
            { text: "Use Passcode", onPress: () => navigation.navigate("Passcode") },
          ]
        );
      }
    } catch (error) {
      navigation.navigate("Passcode");
    }
  };

  return (
    <LinearGradient
      // 右上角到左下角渐变
      colors={[
        "rgba(0,0,230,0.2)",   // #0000e6 透明度20%
        "#ffffff",             // 白色 100%
        "#ffffff",             // 白色 100%
        "rgba(166,58,255,0.2)" // #A63AFF 透明度20%
      ]}
      locations={[0, 0.28, 0.59, 1]}
      start={{ x: 1, y: 0 }} // 右上角
      end={{ x: 0, y: 1 }}   // 左下角
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topColumn}>
          <Text style={styles.text1}>Hi {username}</Text>
          <Text style={styles.text2}>How can I help you today</Text>
        </View>

        <View style={styles.centerButton}>
          <Button title="Show my transaction" onPress={handleNavigate} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
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
