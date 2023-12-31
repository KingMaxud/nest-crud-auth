/** @type {import("prettier").Config} */

module.exports = {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^(@nestjs/(.*)$)|^(@nestjs$)',
    '^(typeorm/(.*)$)|^(typeorm$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
}
