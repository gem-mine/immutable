/**
  * 相关参数文档请参考
  * https://doc.gem-mine.tech/#/zh-cn/toolkit/api/gmsr
  */
const { defineConfig } = require('@gem-mine/script-rollup')

module.exports = defineConfig({
  filenameHashing: false,
  target: ['cjs']
})
