import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TransactionHistoryScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
  <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
</TouchableOpacity>

      <View style={styles.content}>

        <View style={styles.row}>
          <MaterialCommunityIcons name="bitcoin" size={40} color="#f2a900" />
          <View style={styles.totalSpentColumn}>
            <Text style={styles.totalSpentText}>total spent</Text>
            <Text style={styles.totalSpentAmount}>RM 1000</Text>
          </View>
        </View>

        <View style={[styles.row, styles.dateRow]}>
          <Text style={styles.dateText}>16 May 2025</Text>
          <Text style={styles.dateSeparator}>-</Text>
          <Text style={styles.dateText}>17 May 2025</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backIcon: {
    marginTop: 35,
    width: 40,  
    height: 30,
  },
  content: {
    marginTop: 15,  // y=80
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  totalSpentColumn: {
    marginLeft: 10,
  },
  totalSpentText: {
    fontSize: 16,
    color: '#000',
  },
  totalSpentAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  dateRow: {
    paddingHorizontal: 10,
    marginTop: 15,
    gap: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#000',
  },
  dateSeparator: {
    fontSize: 14,
    color: '#000',
  },
});
