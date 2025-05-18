//src/layouts/AppBar/AppBar.styles.tsx

/*
用法：
import styles from "./AppBar.styles";

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
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/Dimensions';


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.1,
    ...Spacing.appBarPaddingBase,
    ...Alignment.alignTopCenter,
  },

  contentWrapper: {
    width: "100%",
    ...Alignment.alignTopCenterAuto,
    flexDirection: "row",
    marginTop:10,
  },

  //leftGroup=(icon+text)
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },

  leftGroupText: {
    ...TextStyle.appBar,
  },

  //RightGroup Text
  rightText: {
    ...TextStyle.appBar,
  },
});

export default styles;
