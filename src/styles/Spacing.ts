// src/styles/Spacing.ts

/*
用法：
import Spacing from '../styles/Spacing';
      <Text style={[styles.text, Spacing.marginBase]}>
    padding: Spacing.medium,
*/

const Spacing = {
  tiny: 2,
  small: 4,
  base: 8,
  medium: 12,
  large: 16,
  xLarge: 24,
  xxLarge: 32,

  horizontalBase: 12,
  verticalBase: 12,

  paddingBase1: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
  },

  appBarPaddingBase: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 30,
    paddingLeft: 18,
  },

  marginBase: {
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
  },
};

export default Spacing;
