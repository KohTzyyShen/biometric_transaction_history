//src/component/TransactionDetailModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  visible: boolean;
  data: TransactionData | null;
  onClose: (event: GestureResponderEvent) => void;
};

function formatAmount(amountString: string): string {
  if (amountString === "****") return "****";
  const amount = parseFloat(amountString.replace(/[^\d.-]/g, ""));
  if (isNaN(amount)) return amountString;

  const sign = amount >= 0 ? "+" : "-";
  return `${sign}RM${Math.abs(amount).toFixed(2)}`;
}

export default function TransactionDetailModal({ visible, data, onClose }: Props) {
  if (!data) return null;

  const variables = [
    { label: "Receiver/Sender", value: data.senderReceiver },
    { label: "Transaction Type", value: data.transactionType },
    { label: "Date", value: data.dateTime },
    data.transactionDetail ? { label: "Detail", value: data.transactionDetail } : null,
    data.paymentID ? { label: "Payment ID", value: data.paymentID } : null,
    data.bankRef ? { label: "Bank Ref", value: data.bankRef } : null,
    data.status ? { label: "Status", value: data.status } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.amountText}>{formatAmount(data.amount)}</Text>

          <View style={styles.variableList}>
            {variables.map(({ label, value }, index) => (
              <View key={index} style={styles.variableRow}>
                <Text style={styles.variableLabel}>{label}</Text>
                <Text style={styles.variableValue}>{value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 26,
    paddingVertical: 30,
    borderRadius: 12,
    width: "80%",
    gap: 30,
  },
  amountText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  variableList: {
    // React Native 不支持 gap，可以用 marginBottom 模拟
  },
  variableRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  variableLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#bababa",
  },
  variableValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 0,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
