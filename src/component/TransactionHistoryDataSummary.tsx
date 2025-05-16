import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  totalAmount?: number;  
  skipPasscode: boolean; 
};

export default function TransactionHistoryDataSummary({ totalAmount, skipPasscode }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="bitcoin" size={40} color="#f2a900" />
        <View style={styles.totalSpentColumn}>
          <Text style={styles.totalSpentText}>Total spent</Text>
          <Text style={styles.totalSpentAmount}>
            {skipPasscode || totalAmount === undefined ? '****' : `RM ${totalAmount.toFixed(2)}`}
          </Text>
        </View>
      </View>

      <View style={[styles.row, styles.dateRow]}>
        <Text style={styles.dateText}>16 May 2025</Text>
        <Text style={styles.dateSeparator}>-</Text>
        <Text style={styles.dateText}>17 May 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
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
