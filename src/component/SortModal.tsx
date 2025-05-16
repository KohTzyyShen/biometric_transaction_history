import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type SortModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: "date" | "amount") => void;
  selectedOption: "date" | "amount";
};

export default function SortModal({ visible, onClose, onSelect, selectedOption }: SortModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.container}>
          <Text style={styles.title}>Sort By</Text>
          {["date", "amount"].map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.option, selectedOption === opt && styles.selected]}
              onPress={() => onSelect(opt as "date" | "amount")}
            >
              <Text style={styles.optionText}>{opt === "date" ? "Date" : "Amount"}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    width: 200,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  option: {
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
});
