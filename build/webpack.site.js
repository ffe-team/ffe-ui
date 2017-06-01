const path = require('path')
const webpack = require('webpack')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const HotModuleReplace = new webpack.HotModuleReplacementPlugin()
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const DefinePlugin = new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": JSON.stringify("dev")
  }
})
const ExtractLess = new ExtractTextPlugin({
  filename: 'style.css'
})
const loaderOptions = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false
})
module.exports = {
  watch: true,
  entry: {
    index: [path.resolve(__dirname, '../site/index.tsx'), 'webpack-dev-server/client?http://localhost:2001/', 'webpack/hot/dev-server']
  },
  output: {
    path: '/',
    filename: '[name].js'
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".less"],
      alias: {
        style: path.resolve(__dirname, '../src/style'),
      } 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          'awesome-typescript-loader'
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        }),
      }
    ]
  },
  plugins: [
    new TsConfigPathsPlugin(),
    loaderOptions,
    ExtractLess,
    HotModuleReplace,
    DefinePlugin,
    new HtmlPlugin({
      filename: 'index.html',
      template: 'site/index.html',
    }),
  ],
}