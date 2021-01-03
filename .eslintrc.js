module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    "space-before-function-paren": 0,
    "quotes": 0,
    'space-before-blocks': 0,
    'key-spacing': 0,
    "eol-last": 0,
    'keyword-spacing': 0,
    'block-spacing': 0,
    'no-extra-semi': 0,
    'arrow-spacing': 0,
    'comma-spacing': 0,
    'indent': 0,
    'spaced-comment': 0,
    'prefer-const': 0,
    'semi': 0,
    'eqeqeq': 0,
    'no-unused-vars': 0,
    'no-undef' :0
  }
}
