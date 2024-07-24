import { fixupConfigRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['.*/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@typescript-eslint/no-var-requires': 0,
      quotes: ['error', 'single'],
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
];
