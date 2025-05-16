import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TransactionHistoryScreen({ navigation }: any) {
  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Transaction History Screen</Text>
      <Button title="Hi" onPress={() => navigation.goBack()} />
    </View>
  );
}
