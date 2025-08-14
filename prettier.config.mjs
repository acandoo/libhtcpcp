// import { type Config } from "prettier";
// const config: Config

const config = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-jsdoc',
    'prettier-plugin-packagejson'
  ],
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  importOrder: ['^node:', '^[^@./][^/]*', '^@', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}

export default config
