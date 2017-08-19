const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const { CommonsChunkPlugin } = require("webpack").optimize

const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"]

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  "entry": {
    "main": [
      "./src/bootstrap/main.ts"
    ],
    "polyfills": [
      "./src/polyfills/polyfills.browser.ts"
    ],
    "styles": [
      "./src/assets/css/styles.styl"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].[chunkhash:5].bundle.js",
    "chunkFilename": "[id].[chunkhash:5].chunk.js"
  },
  "target": "web",
  "plugins": [
    new webpack.optimize.CommonsChunkPlugin({
      "name": 'main',
      "async": 'common',
      "children": true,
      "minChunks": 2
    }),
    new CommonsChunkPlugin({
      "name": "inline",
      "minChunks": null
    }),
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
      "excludeAssets": [/style.*.js/],
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0])
        let rightindex = entryPoints.indexOf(right.names[0])
        if (leftIndex > rightindex) {
            return 1
        } else if (leftIndex < rightindex) {
            return -1
        } else {
            return 0
        }
      }
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      "async": "main",
      "inline": "inline",
      "preload": ["main", "polyfills"]
    }),
    new CopyWebpackPlugin([
      { from: "src/assets/img", to: "assets/img" }
    ]),
    new webpack.DefinePlugin({
      "process.env.NODE_PLATFORM": JSON.stringify("client")
    })
  ]
}
