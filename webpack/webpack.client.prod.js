const path = require("path")
const glob = require("glob")
const nodeModules = path.join(process.cwd(), "node_modules")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const PreloadWebpackPlugin = require("preload-webpack-plugin")
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")
const ZopfliPlugin = require("zopfli-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin")
const PurifyCSSPlugin = require("purifycss-webpack")
const PurifyPlugin = require("@angular-devkit/build-optimizer").PurifyPlugin
const ServiceWorkerPlugin = require("@angular/service-worker/build/webpack").AngularServiceWorkerPlugin
const SubresourceIntegrityPlugin = require("webpack-subresource-integrity")

const serviceWorker = path.resolve(process.cwd(), "node_modules", "@angular/service-worker")

const entryPoints = [
  "inline",
  "polyfills",
  "sw-register",
  "styles",
  "vendor",
  "main"
]

/**
 * This is a client prod config which should be merged on top of common config
 */
module.exports = {
  "entry": {
    "main": "./src/bootstrap/main.ts",
    "polyfills": "./src/polyfills/polyfills.browser.ts",
    "styles": "./src/assets/css/styles.styl",
    "sw-register": path.join(serviceWorker, "build/assets/register-basic.min.js")
  },
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
    new PurifyCSSPlugin({
      "paths": glob.sync(
        path.join(process.cwd(), "src/app/**/*.pug"),
        path.join(process.cwd(), "src/app/**/*.html")
      ),
      "minimize": true,
      "purifyOptions": {
        "whitelist": [
          "cdk-focused",
          "cdk-mouse-focused",
          "cdk-global-scrollblock",
          "cdk-global-overlay-wrapper",
          "cdk-overlay-pane",
          "cdk-overlay-backdrop",
          "cdk-overlay-container",
          "cdk-overlay-dark-backdrop",
          "cdk-overlay-backdrop-showing",
          "cdk-visually-hidden",
          "cdk-focus-trap-anchor",
          "mat-dialog-container",
          "mat-ripple-element",
          "*chip*"
        ]
      }
    }),
    new CopyWebpackPlugin([
      {
        "from": path.join(serviceWorker, "bundles/worker-basic.min.js")
      },
      {
        "from": path.join(process.cwd(), "ngsw-manifest.json")
      },
    ]),
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
    new HtmlWebpackExcludeAssetsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      "async": "main",
      "inline": [
        "inline",
        "sw-register"
      ]
    }),
    new SubresourceIntegrityPlugin({
      "hashFuncNames": [
        "sha256",
        "sha384"
      ]
    }),
    new ZopfliPlugin({
      "asset": "[path].gz[query]",
      "algorithm": "zopfli",
      "test": /\.(js|css|svg|ttf)$/
    }),
    new BrotliPlugin({
      "asset": "[path].br[query]",
      "test": /\.(js|css|svg|ttf)$/
    }),
    new ServiceWorkerPlugin({
      "baseHref": "/"
    })
  ]
}
