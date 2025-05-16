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

import PortfolioData from "../data/Portfolio.json";
import { useUser } from "../context/UserContext";

export default function TransactionHistoryScreen({ navigation, route }: any) {
  const { userId } = useUser();

  const skipPasscode = route?.params?.skipPasscode ?? false;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // 模拟1.5秒刷新过程
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

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

  const totalAmount = !skipPasscode
    ? PortfolioData.TransactionData.filter((tx) => tx.UserId === userId).reduce(
        (acc, tx) => {
          const numericValue = Number(
            String(tx.Amount).replace(/[^\d.-]/g, "")
          );
          return acc + (isNaN(numericValue) ? 0 : numericValue);
        },
        0
      )
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <TransactionHistoryDataSummary
          totalAmount={totalAmount}
          skipPasscode={skipPasscode}
        />

        <View style={styles.transactionSection}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>Transaction</Text>
            <MaterialIcons name="filter-list" size={24} color="black" />
          </View>

          <TransactionHistoryDataCard data={filteredData} />
        </View>
      </ScrollView>
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
