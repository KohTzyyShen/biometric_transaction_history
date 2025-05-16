import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import TransactionHistoryDataCard from "../component/TransactionHistoryDataCard";
import TransactionHistoryDataSummary from "../component/TransactionHistoryDataSummary";
import TransactionDetailModal from "../component/TransactionDetailModal";

import PortfolioData from "../data/Portfolio.json";
import { useUser } from "../context/UserContext";

type TransactionData = {
  UserId?: string;
  senderReceiver: string;
  amount: string;
  transactionType: string;
  dateTime: string;
  transactionDetail?: string;
  paymentID?: string;
  bankRef?: string;
  status?: string;
};

export default function TransactionHistoryScreen({ navigation, route }: any) {
  const { userId } = useUser();
  const skipPasscode = route?.params?.skipPasscode ?? false;

  // 新增状态，管理日期范围
  const [startDate, setStartDate] = useState<Date>(new Date("2025-05-16"));
  const [endDate, setEndDate] = useState<Date>(new Date("2025-05-17"));

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // 过滤并格式化数据时，也可以根据日期范围过滤（如果需要）
  const filteredData: TransactionData[] = PortfolioData.TransactionData
    .filter(tx => tx.UserId === userId)
    .filter(tx => {
      // 以日期范围过滤交易（这里示例）
      const txDate = new Date(tx.DateTime);
      return txDate >= startDate && txDate <= endDate;
    })
    .map(tx => ({
      senderReceiver: tx.SenderReceiver,
      amount: skipPasscode ? "****" : String(tx.Amount),
      transactionType: tx.TransactionType,
      dateTime: new Date(tx.DateTime).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      transactionDetail: tx.TransactionDetail,
      paymentID: tx.PaymentID,
      bankRef: tx.BankRef,
      status: tx.Status,
    }));

  const totalAmount = !skipPasscode
    ? PortfolioData.TransactionData
        .filter((tx) => tx.UserId === userId)
        .filter((tx) => {
          const txDate = new Date(tx.DateTime);
          return txDate >= startDate && txDate <= endDate;
        })
        .reduce((acc, tx) => {
          const numericValue = Number(String(tx.Amount).replace(/[^\d.-]/g, ""));
          return acc + (isNaN(numericValue) ? 0 : numericValue);
        }, 0)
    : 0;

  const handlePressItem = (item: TransactionData) => {
    setSelectedTransaction(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  // 传递给 TransactionHistoryDataSummary 的回调，用于修改日期
  const handleDateChange = (newStartDate: Date, newEndDate: Date) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <TransactionHistoryDataSummary
          totalAmount={totalAmount}
          skipPasscode={skipPasscode}
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />

        <View style={styles.transactionSection}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>Transaction</Text>
            <MaterialIcons name="filter-list" size={24} color="black" />
          </View>

          <TransactionHistoryDataCard data={filteredData} onPressItem={handlePressItem} />
        </View>
      </ScrollView>

      <TransactionDetailModal
        visible={modalVisible}
        data={selectedTransaction}
        onClose={handleCloseModal}
      />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 5,
  },
  transactionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
