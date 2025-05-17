const Color = {
  primary: '#000000',
  one: '#000000',
  two: '#000000',
  four: '#000000',
  background: '#000000',
};

const UnifiedColor = {
  ...Color,
  text1: Color.primary,
  text2: Color.one,
  text3: Color.two,
  background: Color.primary,
};

const gradientBackground = {
  colors: [
    "rgba(0,0,230,0.2)",   // #0000e6 透明度20%
    "#ffffff",             // 白色 100%
    "#ffffff",             // 白色 100%
    "rgba(166,58,255,0.2)" // #A63AFF 透明度20%
  ],
  locations: [0, 0.28, 0.59, 1],
  start: { x: 1, y: 0 },
  end: { x: 0, y: 1 },
};

export { Color, UnifiedColor, gradientBackground };
