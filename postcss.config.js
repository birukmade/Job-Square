const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [postcssImport, postcssJitProps(OpenProps), autoprefixer],
};
