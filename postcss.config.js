module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏的宽度 iPhoneX
      // 设计图750，调成1倍 => 适配375标准屏幕
      // 设计图640，调成1倍 => 适配320标准屏幕
      viewportWidth: 375
    }
  }
}
