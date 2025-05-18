//src/screens/HomeScreen.tsx
import React from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, Alert } from "react-native";
import PortfolioData from "../data/Portfolio.json";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import Typography from '../styles/typography';
import { TouchableOpacity } from 'react-native';



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
      start={{ x: 1, y: 0 }} 
      end={{ x: 0, y: 1 }}   
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
       
<View style={styles.topColumn}>
  <Text style={[Typography.title1, { color: '#0000e6', marginBottom: 5 }]}>
    Hi {username}
  </Text>
  <Text style={[Typography.body3, { color: '#4f4f4f' }]}>
    How can I help you today
  </Text>
</View>

<View style={styles.centerButton}>
  <TouchableOpacity style={styles.customButton} onPress={handleNavigate}>
    <Text style={[Typography.body3, { color: 'black', textAlign: 'center' }]}>
      Show my transaction
    </Text>
  </TouchableOpacity>
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
  centerButton: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 40,
  },
  customButton: {
    backgroundColor: '#ffffff',
    borderRadius: 1000,
    paddingVertical: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 15,
    elevation: 5, // for Android shadow
  },
});

