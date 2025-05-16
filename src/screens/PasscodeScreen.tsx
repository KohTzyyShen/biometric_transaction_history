import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function PasscodeScreen({ navigation }: any) {
  const { authenticate } = useAuth();

  const handleSkip = () => {
    navigation.navigate('Transaction History', { skipPasscode: true });
  };

  const handleCorrect = async () => {
    await authenticate(); // 调用 authenticate 标记认证成功
    navigation.navigate('Transaction History', { skipPasscode: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <Text style={styles.text}>This is Passcode page</Text>
        <Button title="Skip" onPress={handleSkip} />
        <Button title="Correct" onPress={handleCorrect} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
});
