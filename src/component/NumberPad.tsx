// NumberPad.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NumberPadProps {
  value: string;
  maxLength?: number;
  onChange: (val: string) => void;
}
// NumberPad.tsx 仅修改关键部分

export default function NumberPad({ value, maxLength = 6, onChange }: NumberPadProps) {
  const handlePress = (num: string) => {
    if (value.length < maxLength) {
      onChange(value + num);
    }
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      {[
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['', '0', 'delete'],
      ].map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, i) => {
            // 第一行第一个位置不显示空白按钮
            if (rowIndex === 0 && i === 0 && item === '') {
              return null; // 这里不渲染
            }

            if (item === '') {
              // 其他空白格渲染透明占位，避免排版错乱
              return <View key={i} style={[styles.button, { backgroundColor: 'transparent' }]} />;
            }
            if (item === 'delete') {
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.button}
                  onPress={handleDelete}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="backspace-outline" size={28} color="#007bff" />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={i}
                style={styles.button}
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',   
    marginBottom: 20,          
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e6f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,      
  },
  buttonText: {
    fontSize: 28,
    color: '#007bff',
    fontWeight: '600',
  },
});
