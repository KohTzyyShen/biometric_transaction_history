import React from "react";
import { View, Text } from "react-native";
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
} from "../styles";

interface AppBarProps {
  iconBoolean: boolean;
  iconName?: keyof typeof IconMap;
  leftTextBoolean: boolean;
  leftText?: string;
  rightTextBoolean: boolean;
  rightText?: string;
}

const AppBar: React.FC<AppBarProps> = ({
  iconBoolean,
  iconName,
  leftTextBoolean,
  leftText,
  rightTextBoolean,
  rightText,
}) => {
  return (
    <SafeAreaView style={[{ width: "100%" }, Spacing.paddingBase1]}>
      
      <View
        style={[
          Alignment.alignLeft,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              gap: Spacing.tiny,
            },
          ]}
        >
          {iconBoolean && iconName && <Icon name={iconName} />}
          {leftTextBoolean && leftText && (
            <Text
              style={[
                TextStyle.title2,
                {
                  color: UnifiedColor.text1,
                  marginLeft: Spacing.tiny,
                },
              ]}
            >
              {leftText}
            </Text>
          )}
        </View>

        {rightTextBoolean && rightText && (
          <Text style={[TextStyle.title2, { color: UnifiedColor.text1 }]}>
            {rightText}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AppBar;
