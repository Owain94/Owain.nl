const webpack = require("webpack")
const OptimizeJsPlugin = require("optimize-js-plugin")

/**
 * This is a prod config to be merged with the Client config
 */
module.exports = {
  "plugins": [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      "mangle": {
        "keep_fnames": true,
        "screw_ie8": true
      },
      "compress": {
        "warnings": false,
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
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.DEPLOY_URL": JSON.stringify("https://www.owain.nl")
    })
  ]
}
