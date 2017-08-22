const path = require("path")
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const { CommonsChunkPlugin } = require("webpack").optimize

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].[chunkhash:5].bundle.js",
    "chunkFilename": "[id].[chunkhash:5].chunk.js"
  },
  "target": "web",
  "plugins": [
    new webpack.optimize.CommonsChunkPlugin({
      "name": "main",
      "async": "common",
      "children": true,
      "minChunks": 2
    }),
    new CommonsChunkPlugin({
      "name": "inline",
      "minChunks": null
    }),
    new CopyWebpackPlugin([
      {
        "from": "src/assets/img",
        "to": "assets/img"
      },
      {
        "from": "src/assets/icons",
        "to": "assets/icons"
      },
      {
        "from": "src/assets/icons/favicon.ico",
        "to": "favicon.ico"
      }
    ]),
    new webpack.DefinePlugin({
      "process.env.NODE_PLATFORM": JSON.stringify("client")
    })
  ]
}
