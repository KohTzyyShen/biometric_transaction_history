import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';

export default function PasscodeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <Text style={styles.text}>this is passcode page</Text>
        <Button
          title="Skip"
          onPress={() => navigation.navigate('Transaction History', { skipPasscode: true })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
