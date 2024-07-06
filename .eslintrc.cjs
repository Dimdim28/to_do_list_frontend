module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  parser: '@typescript-eslint/parser',
  settings: { react: { version: '18.2' } },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
