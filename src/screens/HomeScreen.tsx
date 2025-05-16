import React from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Transaction History"
          onPress={() => navigation.navigate('Transaction History')}
        />
      </View>
    </SafeAreaView>
  );
}
