module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-else-return': 0,
    'no-useless-return': 0,
    'class-methods-use-this': 0,
    'camelcase': 0,
    'import/extensions': 0,
    'no-console': 0,
  },
};
