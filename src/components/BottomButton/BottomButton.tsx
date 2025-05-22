//src/components/BottomButon/BottomButton.tsx
/*
用法：

import BottomButton from '../components/BottomButton/BottomButton';

<BottomButton
  title="Confirm"
  onPress={() => console.log('Pressed')}
/>
*/

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import {
  Radius,
  Alignment,
  Color,
  IconMap,
  UnifiedColor,
  gradientBackground,
  Icon,
  Spacing,
  Strings,
  TextStyle,
} from "../../styles";


import styles from './BottomButton.styles';

interface BottomButtonProps {
  title: string;
  onPress: () => void;
}

const BottomButton: React.FC<BottomButtonProps> = ({ title, onPress, }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
      <TouchableOpacity
        style={[styles.button]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
            </View>
    </View>
  );
};

export default BottomButton;
