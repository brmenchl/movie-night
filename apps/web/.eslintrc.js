module.exports = {
  root: true,
  extends: ["custom"],
  overrides: [{
    files: ["*"],
    settings: {
      'import/resolver': {
        typescript: {
          'alwaysTryTypes': true,
          project: './tsconfig.json',
        },
      },
    }
  }]
};
