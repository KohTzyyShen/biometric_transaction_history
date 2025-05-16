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
import SortModal from "../component/SortModal"; // ✅ 新增

import PortfolioData from "../data/Portfolio.json";
import { useUser } from "../context/UserContext";

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

export default function TransactionHistoryScreen({ navigation, route }: any) {
  const { userId } = useUser();
  const skipPasscode = route?.params?.skipPasscode ?? false;

  const [startDate, setStartDate] = useState<Date>(new Date("2025-05-16"));
  const [endDate, setEndDate] = useState<Date>(new Date("2025-05-17"));
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "amount">("date"); // ✅ 排序依据
  const [sortModalVisible, setSortModalVisible] = useState(false); // ✅ 控制排序弹窗

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const filteredData: TransactionData[] = PortfolioData.TransactionData
    .filter(tx => tx.UserId === userId)
    .filter(tx => {
      const txDate = new Date(tx.DateTime);
      return txDate >= startDate && txDate <= endDate;
    })
    .map(tx => ({
      senderReceiver: tx.SenderReceiver,
      amount: skipPasscode ? "****" : String(tx.Amount),
      transactionType: tx.TransactionType,
      dateTime: new Date(tx.DateTime).toISOString(),
      transactionDetail: tx.TransactionDetail,
      paymentID: tx.PaymentID,
      bankRef: tx.BankRef,
      status: tx.Status,
    }))
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
      } else {
        const amountA = parseFloat(a.amount.replace(/[^\d.-]/g, "")) || 0;
        const amountB = parseFloat(b.amount.replace(/[^\d.-]/g, "")) || 0;
        return amountB - amountA;
      }
    })
    .map(tx => ({
      ...tx,
      dateTime: new Date(tx.dateTime).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
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
            <TouchableOpacity onPress={() => setSortModalVisible(true)}>
              <MaterialIcons name="filter-list" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <TransactionHistoryDataCard data={filteredData} onPressItem={handlePressItem} />
        </View>
      </ScrollView>

      <TransactionDetailModal
        visible={modalVisible}
        data={selectedTransaction}
        onClose={handleCloseModal}
      />

      <SortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onSelect={(option) => {
          setSortBy(option);
          setSortModalVisible(false);
        }}
        selectedOption={sortBy}
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
