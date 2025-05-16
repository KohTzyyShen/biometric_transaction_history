import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import TransactionHistoryDataCard from "../component/TransactionHistoryDataCard";
import TransactionHistoryDataSummary from "../component/TransactionHistoryDataSummary";

import PortfolioData from "../data/Portfolio.json";
import { useUser } from "../context/UserContext";

export default function TransactionHistoryScreen({ navigation, route }: any) {
  const { userId } = useUser();

  // route.params.skipPasscode 会是 true，如果用户跳过 passcode
  const skipPasscode = route?.params?.skipPasscode ?? false;

  // 过滤并格式化数据，amount 始终保持为 string 类型（如需遮盖则为 "****"）
  const filteredData = PortfolioData.TransactionData.filter(
    (tx) => tx.UserId === userId
  ).map((tx) => ({
    senderReceiver: tx.SenderReceiver,
    amount: skipPasscode ? "****" : String(tx.Amount),
    transactionType: tx.TransactionType,
    dateTime: new Date(tx.DateTime).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  // 正确计算总金额，仅当 skipPasscode 为 false 时才执行加总
  const totalAmount = !skipPasscode
    ? PortfolioData.TransactionData.filter((tx) => tx.UserId === userId).reduce(
        (acc, tx) => {
          const numericValue = Number(
            String(tx.Amount).replace(/[^\d.-]/g, "") // 去掉任何非数字字符，如 RM、空格
          );
          return acc + (isNaN(numericValue) ? 0 : numericValue);
        },
        0
      )
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      {/* 传入 totalAmount 和 skipPasscode */}
      <TransactionHistoryDataSummary
        totalAmount={totalAmount}
        skipPasscode={skipPasscode}
      />

      <View style={styles.transactionSection}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>Transaction</Text>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </View>

        <ScrollView style={{ flex: 1 }}>
          <TransactionHistoryDataCard data={filteredData} />
        </ScrollView>
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
