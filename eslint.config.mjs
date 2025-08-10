import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import airbnb from 'eslint-config-airbnb';
import airbnbTs from 'eslint-config-airbnb-typescript';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['.next/**', 'node_modules', 'dist', 'build', 'lint-staged.config.js'],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...airbnb.rules,
      ...airbnbTs.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...prettierConfig.rules, // Disable ESLint rules that conflict with Prettier
      ...prettierPlugin.configs.recommended.rules, // Run Prettier as an ESLint rule
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['error'] }],
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off', // Airbnb prefers default exports, but this is optional
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'max-len': ['error', { code: 80, ignoreComments: true, ignoreUrls: true }],
      'func-call-spacing': ['error', 'never'],

      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }], // One prop per line for multiline JSX
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // Align closing bracket with opening tag
      'react/jsx-first-prop-new-line': ['error', 'multiline'], // First prop on new line for multiline JSX
    },
  },
  {
    files: ['icons/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'max-len': 'off', // Disable max-len for icon folder
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
];