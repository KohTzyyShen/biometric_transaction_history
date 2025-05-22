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
    ...Alignment.alignTopCenter,
    ...Spacing.bottomButtonWidthPaddingBase,

    },
    buttonView: {
    width:"100%",
    borderRadius:Radius.full,
    ...Alignment.alignCenter,
    ...Spacing.bottomButtonContentPaddingBase,
    backgroundColor: UnifiedColor.background1,
    },
    button: {
    width:"100%",
    ...Alignment.alignTopCenter,
    },

    buttonText: {
    ...TextStyle.bottomButton,
    },
    });

export default styles;
