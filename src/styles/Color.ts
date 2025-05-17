//src/styles/Color.ts

/*
用法：
import { Color, UnifiedColor, gradientBackground } from './Color';

1. Color
color:Color.one

2. UnifiedColor
color:UnifiedColor.background

3. gradientBackground
<LinearGradient {...gradientBackground} style={{ flex: 1 }}>
  ...
</LinearGradient>
*/

const Color = {
  theme: '#0000e6',
  one: '#000000',
  two: '#000000',
  four: '#000000',
  background: '#000000',
};

const UnifiedColor = {
  ...Color,
  text1: Color.theme,
  text2: Color.one,
  text3: Color.two,
  background: Color.theme,
  icon1: Color.theme,
};

const gradientBackground = {
  colors: [
    "rgba(0,0,230,0.2)",   
    "#ffffff",            
    "#ffffff",           
    "rgba(166,58,255,0.2)" 
  ],
  locations: [0, 0.28, 0.59, 1],
  start: { x: 1, y: 0 },
  end: { x: 0, y: 1 },
};

export { Color, UnifiedColor, gradientBackground };
