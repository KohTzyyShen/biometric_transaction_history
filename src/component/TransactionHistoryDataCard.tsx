import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TransactionData = {
  senderReceiver: string;
  amount: string;
  transactionType: string;
  dateTime: string;
  transactionDetail?: string;
  paymentID?: string;
  bankRef?: string;
  status?: string;
};

type Props = {
  data: TransactionData[];
  onPressItem: (item: TransactionData) => void;  
};

export default function TransactionHistoryDataCard({ data, onPressItem }: Props) {


  function formatAmount(amountStr: string, transactionType: string): string {
  const amountNum = Number(amountStr);
  if (isNaN(amountNum)) {
    return amountStr;
  }

  const sign = transactionType === 'Moved' ? '-' : '+';  
  return `${sign}RM${Math.abs(amountNum)}`;
}

  return (
    <View style={styles.listContainer}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={() => onPressItem(item)}  
          activeOpacity={0.7}
        >
          <View style={styles.row}>
            <Text style={styles.senderReceiver}>{item.senderReceiver}</Text>
<Text style={styles.amount}>{formatAmount(item.amount, item.transactionType)}</Text>
          </View>

          <View style={styles.transactionAndLine}>
            <View style={styles.row}>
              <Text style={styles.transactionType}>{item.transactionType}</Text>
              <Text style={styles.dateTime}>{item.dateTime}</Text>
            </View>
            <View style={styles.line} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 10,
    flexDirection: 'column',
    gap: 13,
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 5,
  },
  transactionAndLine: {
    flexDirection: 'column',
    gap: 13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  senderReceiver: {
    fontWeight: '600',
    fontSize: 16,
  },
  amount: {
    fontWeight: '600',
    fontSize: 16,
  },
  transactionType: {
    color: '#666',
  },
  dateTime: {
    color: '#666',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
});
