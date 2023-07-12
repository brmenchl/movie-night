module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'turbo',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['*.config.js'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { "argsIgnorePattern": "^_" }],
    'react/display-name': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    'sort-imports': ['error', {
      ignoreDeclarationSort: true,
      allowSeparatedGroups: true,
    }],
  },
};
