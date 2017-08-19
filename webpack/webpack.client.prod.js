const path = require("path")
const glob = require("glob")
const nodeModules = path.join(process.cwd(), "node_modules")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const ZopfliPlugin = require("zopfli-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin")
const PurifyCSSPlugin = require("purifycss-webpack")
const PurifyPlugin = require("@angular-devkit/build-optimizer").PurifyPlugin
const SubresourceIntegrityPlugin = require("webpack-subresource-integrity")
const webpack = require("webpack")
const OptimizeJsPlugin = require("optimize-js-plugin")


/**
 * This is a client prod config which should be merged on top of common config
 */
module.exports = {
  "module": {
    "rules": [
      {
        "test": /\.js$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": false
            }
          },
          "@ngtools/webpack"
        ]
      }
    ]
  },
  "output": {
    "crossOriginLoading": "anonymous"
  },
  "plugins": [
    new PurifyPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      "mangle": {
        "keep_fnames": true,
        "screw_ie8": true
      },
      "compress": {
        "warnings" : false,
        "conditionals": true,
        "unused": true,
        "comparisons": true,
        "sequences": true,
        "dead_code": true,
        "evaluate": true,
        "if_return": true,
        "join_vars": true,
        "negate_iife": false,
        "screw_ie8": true,
        "pure_getters": true
      },
      "comments": false
    }),
    new OptimizeJsPlugin({
      "sourceMap": false
    }),
    new FaviconsWebpackPlugin({
      "appName": "Logging",
      "appDescription": "Logging",
      "developerName": "Owain van Brakel",
      "developerURL": "https://www.owain.nl",
      "background": "#303030",
      "theme_color": "#c2185b",
      "display": "standalone",
      "version": "1.0",
      "logging": false,
      "online": false,
      "preferOnline": false,
      "start_url": "/",
      "logo": "src/assets/img/icon.png",
      "prefix": "assets/icons/",
      "emitStats": false,
      "persistentCache": true,
      "inject": true,
      "title": "Owain.nl",
      "icons": {
        "android": true,
        "appleIcon": false,
        "appleStartup": false,
        "coast": false,
        "favicons": true,
        "firefox": true,
        "opengraph": true,
        "twitter": true,
        "yandex": true,
        "windows": true
      }
    }),
    new SubresourceIntegrityPlugin({
      "hashFuncNames": ["sha256", "sha384"]
    }),
    new ZopfliPlugin({
      "asset": "[path].gz[query]",
      "algorithm": "zopfli",
      "test": /\.(js|css|html|svg|ttf)$/
    }),
    new BrotliPlugin({
      "asset": "[path].br[query]",
      "test": /\.(js|css|html|svg|ttf)$/
    })
  ]
}
