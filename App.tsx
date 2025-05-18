//App.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Icon } from './src/styles/Icon';  
import AppBar from "./src/layouts/AppBar/AppBar";


const App = () => {
  const appBarConfig = {
    iconBoolean: true,
    iconName: "deleteicon",
    leftTextBoolean: true,
    leftText: "Home",
    rightTextBoolean: true,
    rightText: "Edit"
  } as const;;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.center}>
        <Text style={styles.text}>Hello, this is a test component!</Text>
        <Icon name="deleteicon" />
        <AppBar config={appBarConfig} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',     
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;


