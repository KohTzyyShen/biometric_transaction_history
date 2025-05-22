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
container:{
 ...Alignment.alignTopCenter,
 width:"100%",
 height:"90%",
 //justifyContent: 'space-between',
 gap:200,
},

title:{
 ...Alignment.alignTopCenter,
 width:"100%",
},

GreetingUser: {
     ...TextStyle.Text1,
  },
GreetingText: {
     ...TextStyle.Body1,
  },
    });

export default styles;