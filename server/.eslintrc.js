module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: ['../.eslintrc.js'],
  plugins: ['import'],
  rules: {
    // TypeScript ESLint
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Import
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'off',
    'import/newline-after-import': 'error',
  },
};
