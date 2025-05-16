import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  totalAmount?: number;
  skipPasscode: boolean;
};

export default function TransactionHistoryDataSummary({ totalAmount, skipPasscode }: Props) {
  function formatAmount(amount?: number): string {
    if (amount === undefined || amount === null) return '';
    const sign = amount >= 0 ? '+' : '-';
    return `${sign}RM${Math.abs(amount).toFixed(2)}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FontAwesome name="bitcoin" size={40} color="#0000e6" />
        <View style={styles.totalSpentColumn}>
          <Text style={styles.totalSpentText}>Total amount</Text>
          <Text style={styles.totalSpentAmount}>
            {skipPasscode ? '****' : formatAmount(totalAmount)}
          </Text>
        </View>
      </View>

      <View style={[styles.row, styles.dateRow]}>
        <View style={styles.dateContent}>
          <Text style={styles.dateText}>16 May 2025</Text>
          <Text style={styles.dateSeparator}>-</Text>
          <Text style={styles.dateText}>17 May 2025</Text>
        </View>
        <AntDesign name="calendar" size={24} color="black" />
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
    marginTop: 15,
    justifyContent: 'space-between',
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
