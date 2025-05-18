//src/component/TransactionHistoryDataSummary.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Calendar, DateData } from 'react-native-calendars';

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
  const [showCalendar, setShowCalendar] = useState(false);
  const [rangeStart, setRangeStart] = useState<string>(startDate.toISOString().slice(0, 10));
  const [rangeEnd, setRangeEnd] = useState<string>(endDate.toISOString().slice(0, 10));
  const [selectingStart, setSelectingStart] = useState(true); // 标记是选开始日期还是结束日期

  // 格式化金额，带正负号
  function formatAmount(amount?: number): string {
    if (amount === undefined || amount === null) return '';
    const sign = amount >= 0 ? '+' : '-';
    return `${sign}RM${Math.abs(amount).toFixed(2)}`;
  }

  // 格式化日期为 "D MMM YYYY" 格式
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  // 生成 markedDates，用于 react-native-calendars 的 period 标记
  const generateMarkedDates = () => {
    if (!rangeStart || !rangeEnd) return {};

    let start = new Date(rangeStart);
    let end = new Date(rangeEnd);

    if (start > end) {
      [start, end] = [end, start];
    }

    const marked: Record<string, any> = {};

    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().slice(0, 10);
      if (dateStr === rangeStart) {
        marked[dateStr] = {
          startingDay: true,
          color: '#00adf5',
          textColor: 'white',
        };
      } else if (dateStr === rangeEnd) {
        marked[dateStr] = {
          endingDay: true,
          color: '#00adf5',
          textColor: 'white',
        };
      } else {
        marked[dateStr] = {
          color: '#d0e8ff',
          textColor: 'black',
        };
      }
      current.setDate(current.getDate() + 1);
    }
    return marked;
  };

  // 点击日历某天的处理逻辑
const onDayPress = (day: DateData) => {
  if (selectingStart) {
    setRangeStart(day.dateString);
    if (new Date(day.dateString) > new Date(rangeEnd)) {
      setRangeEnd(day.dateString);
    }
    onDateChange(new Date(day.dateString), new Date(rangeEnd));
    setSelectingStart(false);
  } else {
    if (new Date(day.dateString) < new Date(rangeStart)) {
      setRangeStart(day.dateString);
      onDateChange(new Date(day.dateString), new Date(rangeEnd));
    } else {
      setRangeEnd(day.dateString);
      onDateChange(new Date(rangeStart), new Date(day.dateString));
    }
    setSelectingStart(true);
    setShowCalendar(false);
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

      <TouchableOpacity style={[styles.row, styles.dateRow]} onPress={() => setShowCalendar(true)}>
        <View style={styles.dateContent}>
          <Text style={styles.dateText}>{formatDate(new Date(rangeStart))}</Text>
          <Text style={styles.dateSeparator}> - </Text>
          <Text style={styles.dateText}>{formatDate(new Date(rangeEnd))}</Text>
        </View>
        <AntDesign name="calendar" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={showCalendar} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setShowCalendar(false)}
        >
          <View style={styles.calendarContainer}>
            <Calendar
              markingType="period"
              markedDates={generateMarkedDates()}
              onDayPress={onDayPress}
              // current={rangeStart}
              firstDay={1}
              theme={{
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                arrowColor: '#00adf5',
              }}
            />
            <Text style={{textAlign:'center',marginTop:5, color:'#555'}}>
              {selectingStart ? 'Select start date' : 'Select end date'}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,

    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,

    elevation: 4,

    paddingHorizontal: 15,
    paddingVertical: 8,
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
    color: '#0000e6',
  },
  dateRow: {
    marginTop: 15,
    gap: 15,
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
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
});
