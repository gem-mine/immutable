/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  roots: [
    '<rootDir>/test/'
  ],
  testRegex: 'test/(.+)\\.test\\.(tsx?|jsx?)$',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // 将.js(x)后缀的文件使用babel-jest处理
    '^.+\\.tsx?$': 'ts-jest', // 将.ts(x)后缀的文件使用ts-jest处理
  },
}
