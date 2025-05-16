import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import PortfolioData from '../data/Portfolio.json';

export default function HomeScreen({ navigation }: any) {
  const username = PortfolioData.Login.username;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topColumn}>
        <Text style={styles.text1}>Hi {username}</Text>
        <Text style={styles.text2}>How can I help you today</Text>
      </View>

      <View style={styles.centerButton}>
        <Button
          title="Show my transaction"
          onPress={() => navigation.navigate('Transaction History')}
        />
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




/*import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topColumn}>
        <Text style={styles.text1}>Hi Koh Tzyy Shen</Text>
        <Text style={styles.text2}>How can I help you today</Text>
      </View>

      <View style={styles.centerButton}>
        <Button
          title="Show my transaction"
          onPress={() => navigation.navigate('Transaction History')}
        />
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
*/