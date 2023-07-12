module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['*.config.js'],
  rules: {
    'sort-imports': ['error', {
      ignoreDeclarationSort: true,
      allowSeparatedGroups: true,
    }],
  },
};
