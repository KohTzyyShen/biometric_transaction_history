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

const styles = StyleSheet.create({

//    <SafeAreaView style={[{ width: "100%" }, Spacing.paddingBase1]}>
  container: {
    width: "100%",
    ...Spacing.paddingBase1,
  },

/*          <View
        style={[
          Alignment.alignLeft,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
*/
   contentWrapper: {
   ...Alignment.alignLeft,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
  },

/* 
<View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              gap: Spacing.tiny,
            },
          ]}
        >
*/
//LeftGroup (icon+text)
leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },


/* 
<Text
              style={[
                TextStyle.title2,
                {
                  color: UnifiedColor.text1,
                  marginLeft: Spacing.tiny,
                },
              ]}
            > 
*/
leftGroupText:{
...TextStyle.title2,
color: UnifiedColor.text1,
marginLeft: Spacing.tiny,
},

/*
<Text style={[TextStyle.title2, { color: UnifiedColor.text1 }]}>
            {rightText}
</Text> 
*/
//RightGroup Text
rightText: {
    ...TextStyle.title2,
    color: UnifiedColor.text1,
  },
});

export default styles;