import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import PortfolioData from '../data/Portfolio.json';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }: any) {
  const username = PortfolioData.Login.username;
  const { isAuthenticated } = useAuth();

  const handleNavigate = () => {
    if (!isAuthenticated) {
      navigation.navigate('Passcode'); // 未认证跳Passcode输入页
    } else {
      navigation.navigate('Transaction History'); // 已认证直接跳交易历史
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
    alignItems: 'center',
  },
  text1: {
    color: '#0000e6',
    fontSize: 18,
    marginBottom: 13,
  },
  text2: {
    color: '#4f4f4f',
    fontSize: 16,
  },
  centerButton: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 40,
  },
});
