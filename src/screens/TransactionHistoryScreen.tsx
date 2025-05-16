import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import TransactionHistoryDataCard from '../component/TransactionHistoryDataCard';
import TransactionHistoryDataSummary from '../component/TransactionHistoryDataSummary';  // 新引入

const dummyData = [
  {
    senderReceiver: 'Rainly',
    amount: 'RM500',
    transactionType: 'Moved',
    dateTime: '14 May 2025',
  },
  {
    senderReceiver: 'John',
    amount: 'RM300',
    transactionType: 'Received',
    dateTime: '13 May 2025',
  },
];

export default function TransactionHistoryScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      {/* 调用拆分后的组件 */}
      <TransactionHistoryDataSummary />

      <View style={styles.transactionSection}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>Transaction</Text>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </View>
        <TransactionHistoryDataCard data={dummyData} />
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
  transactionSection: {
    marginHorizontal: 5,
    marginTop: 60,
    gap: 20,
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
  },
  transactionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
