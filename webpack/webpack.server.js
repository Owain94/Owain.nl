const path = require("path")
const webpack = require("webpack")

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  "entry": {
    "main": [
      "./src/bootstrap/main.server.ts"
    ]
  },
  "resolve": {
    "extensions": [
      ".node"
    ]
  },
  "module": {
    "rules": [
      {
        "test": /\.node$/,
        "loader": "node-loader"
      }
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].server.bundle.js",
    "chunkFilename": "[id].server.chunk.js",
    "libraryTarget": "commonjs"
  },
  "target": "node",
  "plugins": [
    new webpack.DefinePlugin({
      "process.env.NODE_PLATFORM": JSON.stringify("server")
    })
  ]
}
