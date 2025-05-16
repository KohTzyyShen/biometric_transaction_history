import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TransactionData = {
  senderReceiver: string;
  amount: string;
  transactionType: string;
  dateTime: string;
};

type Props = {
  data: TransactionData[];
};

export default function TransactionHistoryDataCard({ data }: Props) {
  return (
    <View style={styles.listContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.cardContainer}>
          <View style={styles.row}>
            <Text style={styles.senderReceiver}>{item.senderReceiver}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.transactionType}>{item.transactionType}</Text>
            <Text style={styles.dateTime}>{item.dateTime}</Text>
          </View>
          <View style={styles.line} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 5,
    flexDirection: 'column',
    gap: 13, 
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 5,
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
