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

// 扩展字段，确保包含所有详情字段
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

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // 这里用展开符号 ...tx 保留所有字段，仅覆盖 amount 和 dateTime 格式
  const filteredData: TransactionData[] = PortfolioData.TransactionData
  .filter(tx => tx.UserId === userId)
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
    ? PortfolioData.TransactionData.filter((tx) => tx.UserId === userId).reduce(
        (acc, tx) => {
          const numericValue = Number(String(tx.Amount).replace(/[^\d.-]/g, ""));
          return acc + (isNaN(numericValue) ? 0 : numericValue);
        },
        0
      )
    : 0;

  // 点击某条交易，打开详情 Modal
  const handlePressItem = (item: TransactionData) => {
    setSelectedTransaction(item);
    setModalVisible(true);
  };


  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
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

        <TransactionHistoryDataSummary totalAmount={totalAmount} skipPasscode={skipPasscode} />

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
