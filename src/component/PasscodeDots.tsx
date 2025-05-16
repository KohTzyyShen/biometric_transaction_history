// PasscodeDots.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PasscodeDotsProps {
  length: number; // 当前输入的数字个数
  maxLength?: number; // 最大长度，默认6
}

export default function PasscodeDots({ length, maxLength = 6 }: PasscodeDotsProps) {
  return (
    <View style={styles.dotContainer}>
      {[...Array(maxLength)].map((_, i) => (
        <Text
          key={i}
          style={[styles.dot, i < length ? styles.filledDot : styles.emptyDot]}
        >
          ●
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  dot: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  filledDot: {
    color: '#007bff', // 深蓝
  },
  emptyDot: {
    color: '#86C1FF', // 浅蓝
  },
});
