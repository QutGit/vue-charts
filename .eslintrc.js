module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    mocha: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'one-var': 'off',
    'eqeqeq': 'off',
    'multiline-comment-style': 'off',
  },

}