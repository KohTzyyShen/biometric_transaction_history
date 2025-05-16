// PasscodeDots.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PasscodeDotsProps {
  length: number; 
  maxLength?: number; 
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
    color: '#007bff', 
  },
  emptyDot: {
    color: '#e6f0ff', 
  },
});
