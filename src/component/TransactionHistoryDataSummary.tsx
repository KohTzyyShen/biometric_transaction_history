import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  totalAmount?: number;
  skipPasscode: boolean;
  startDate: Date;
  endDate: Date;
  onDateChange: (newStartDate: Date, newEndDate: Date) => void;
};

export default function TransactionHistoryDataSummary({
  totalAmount,
  skipPasscode,
  startDate,
  endDate,
  onDateChange,
}: Props) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  function formatAmount(amount?: number): string {
    if (amount === undefined || amount === null) return '';
    const sign = amount >= 0 ? '+' : '-';
    return `${sign}RM${Math.abs(amount).toFixed(2)}`;
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  const onChangeStart = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onDateChange(selectedDate, endDate); // 调用合并的回调
    }
  };

  const onChangeEnd = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onDateChange(startDate, selectedDate); // 调用合并的回调
    }
  };

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
          <TouchableOpacity onPress={() => setShowStartPicker(true)}>
            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
          </TouchableOpacity>

          <Text style={styles.dateSeparator}>-</Text>

          <TouchableOpacity onPress={() => setShowEndPicker(true)}>
            <Text style={styles.dateText}>{formatDate(endDate)}</Text>
          </TouchableOpacity>
        </View>
        <AntDesign name="calendar" size={24} color="black" />
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStart}
          maximumDate={endDate}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEnd}
          minimumDate={startDate}
        />
      )}
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
    textDecorationLine: 'underline',
  },
  dateSeparator: {
    fontSize: 14,
    color: '#000',
  },
});
