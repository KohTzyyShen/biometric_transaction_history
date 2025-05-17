import { StyleSheet } from 'react-native';

// 分层定义基础样式常量
const TextSize = {
  size1: 28,
  size2: 22,
  size3: 16,
  size4: 14,
  size5: 12,
};

const FontWeight = {
  weight1: 'bold',
  weight2: '700',
  weight3: '400',
} as const;

const LineHeight = {
  height1: 36,
  height2: 30,
  height3: 24,
  height4: 20,
  height5: 18,
};

const TextStyle = StyleSheet.create({
  title1: {
    fontSize: TextSize.size1,
    fontWeight: FontWeight.weight1,
    lineHeight: LineHeight.height1,
  },
  title2: {
    fontSize: TextSize.size2,
    fontWeight: FontWeight.weight2,
    lineHeight: LineHeight.height2,
  },
  body1: {
    fontSize: TextSize.size3,
    fontWeight: FontWeight.weight3,
    lineHeight: LineHeight.height3,
  },
  caption: {
    fontSize: TextSize.size5,
    fontWeight: FontWeight.weight3,
    lineHeight: LineHeight.height5,
  },
});

export default TextStyle;
