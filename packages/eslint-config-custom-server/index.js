module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/strict-type-checked',
    'turbo',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['*.config.js', '*eslintrc*'],
  rules: {
    "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
    '@typescript-eslint/no-unused-vars': ['error', { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-floating-promises": 'off',
    'turbo/no-undeclared-env-vars': 'off',
    'sort-imports': ['error', {
      ignoreDeclarationSort: true,
      allowSeparatedGroups: true,
    }],
  },
};
