module.exports = {
  pluginSearchDirs: false,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 100,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
};
