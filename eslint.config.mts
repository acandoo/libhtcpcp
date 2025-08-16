import eslintConfigPrettier from 'eslint-config-prettier'
import tsdoc from 'eslint-plugin-tsdoc'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import js from '@eslint/js'

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node }
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  tsdoc.rules
)
