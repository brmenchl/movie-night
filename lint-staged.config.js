module.exports = {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '**/*.ts?(x)': ['eslint --fix', 'prettier --write --ignore-unknown'],
};
