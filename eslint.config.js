// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');

module.exports = tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.expo/**',
      '**/dist/**',
      'eslint.config.js',
      'metro.config.js',
      'tailwind.config.js',
      'babel.config.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
);
