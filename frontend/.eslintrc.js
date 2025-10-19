module.exports = {
  extends: [],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react']
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: [],
  rules: {
    // Disable all rules for now to get the app running
  }
}; 