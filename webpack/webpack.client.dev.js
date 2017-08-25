const HtmlWebpackPlugin = require("html-webpack-plugin")
const PreloadWebpackPlugin = require("preload-webpack-plugin")
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")

const entryPoints = [
  "inline",
  "polyfills",
  "sw-register",
  "styles",
  "vendor",
  "main"
]

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  "entry": {
    "main": "./src/bootstrap/main.ts",
    "polyfills": "./src/polyfills/polyfills.browser.ts",
    "styles": "./src/assets/css/styles.styl"
  },
  "plugins": [
    new HtmlWebpackPlugin({
      "template": "./src/index.pug",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "cache": false,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "xhtml": true,
      "minify": {
        "caseSensitive": true,
        "collapseWhitespace": true,
        "keepClosingSlash": true
      },
      "excludeAssets": [/styles.*.js/],
      "chunksSortMode": function sort (left, right) {
        const leftIndex = entryPoints.indexOf(left.names[0])
        const rightindex = entryPoints.indexOf(right.names[0])

        if (leftIndex > rightindex) {
          return 1
        } else if (leftIndex < rightindex) {
          return -1
        } else {
          return 0
        }
      }
    }),
    new PreloadWebpackPlugin({
      "rel": "preload",
      "include": [
        "styles"
      ],
      "fileBlacklist": [
        /styles.*.js/
      ]
    }),
    new HtmlWebpackExcludeAssetsPlugin()
  ]
}
