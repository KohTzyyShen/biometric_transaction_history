// src/styles/Spacing.ts

/*
用法：
import Spacing from '../styles/Spacing';
      <Text style={[styles.text, Spacing.marginBase]}>
    padding: Spacing.medium,
*/

const Spacing = {
  tiny: 4,
  small: 8,
  base: 12,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 40,

  horizontalBase: 12,
  verticalBase: 12,

  paddingBase1: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
  },

  marginBase: {
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
  },
};

export default Spacing;
