import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

type TransactionData = {
  senderReceiver: string;
  amount: string;
  transactionType: string;
  dateTime: string;
  transactionDetail?: string; // 新增可选字段
  paymentID?: string;
  bankRef?: string;
  status?: string;
};

type Props = {
  visible: boolean;
  data: TransactionData | null;
  onClose: (event: GestureResponderEvent) => void;
};

export default function TransactionDetailModal({ visible, data, onClose }: Props) {
  if (!data) return null;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Transaction Details</Text>

          <Text>
            <Text style={styles.label}>Receiver/Sender: </Text>
            {data.senderReceiver}
          </Text>
          <Text>
            <Text style={styles.label}>Amount: </Text>
            {data.amount}
          </Text>
          <Text>
            <Text style={styles.label}>Type: </Text>
            {data.transactionType}
          </Text>
          <Text>
            <Text style={styles.label}>Date: </Text>
            {data.dateTime}
          </Text>
          {/* 新增字段展示 */}
          {data.transactionDetail && (
            <Text>
              <Text style={styles.label}>Detail: </Text>
              {data.transactionDetail}
            </Text>
          )}
          {data.paymentID && (
            <Text>
              <Text style={styles.label}>Payment ID: </Text>
              {data.paymentID}
            </Text>
          )}
          {data.bankRef && (
            <Text>
              <Text style={styles.label}>Bank Ref: </Text>
              {data.bankRef}
            </Text>
          )}
          {data.status && (
            <Text>
              <Text style={styles.label}>Status: </Text>
              {data.status}
            </Text>
          )}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  label: {
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
