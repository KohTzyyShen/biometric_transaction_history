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

  // route.params.skipPasscode 会是true，如果用户跳过passcode
  const skipPasscode = route?.params?.skipPasscode ?? false;

  const filteredData = PortfolioData.TransactionData
    .filter((tx) => tx.UserId === userId)
    .map((tx) => ({
      senderReceiver: tx.SenderReceiver,
      // 根据skipPasscode决定金额是显示原值还是****遮盖
      amount: skipPasscode ? "****" : tx.Amount,
      transactionType: tx.TransactionType,
      dateTime: new Date(tx.DateTime).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }));

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Transaction Summary */}
      <TransactionHistoryDataSummary />

      {/* Transaction Section */}
      <View style={styles.transactionSection}>
        {/* Header */}
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>Transaction</Text>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </View>

        {/* Transaction Data List */}
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
