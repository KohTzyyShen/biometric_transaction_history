//src/layouts/BaseScreenLayout/BaseScreenLayout.styles.ts

/*
用法：
import styles from "./BaseScreenLayout.styles";

<Text style={styles.rightText}>{rightText}</Text>
style={styles.}
*/

import { StyleSheet } from "react-native";
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

const styles = StyleSheet.create({
  container: {
   width: "100%",
   height:"100%",
   ...Alignment.alignTopLeft
  },

    contentWrapper: {
   width: "100%",
   height:"100%",
   ...Alignment.alignTopLeft
  },

});

export default styles;
