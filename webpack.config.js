const path = require('path')
const webpack = require('webpack')
const theme = require('./src/style/theme')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractLess = new ExtractTextPlugin({
  filename: 'style.css'
})
const loaderOptions = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  options: {
    less: {
      modifyVars: theme
    }
  }
})

module.exports = {
  watch: true,
  entry: path.resolve(__dirname, 'src/components/index.tsx'),
  output: {
    path: 'build',
    filename: 'ffe-ui.js'
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".less"],
      alias: {
        style: path.resolve(__dirname, 'src/style'),
        fonts: path.resolve(__dirname, 'src/fonts')
      }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new TsConfigPathsPlugin(),
    loaderOptions,
    ExtractLess,
  ],
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      'react-addons-css-transition-group': {
        root: ['React', 'addons', 'CSSTransitionGroup'],
        commonjs2: 'react-addons-css-transition-group',
        commonjs: 'react-addons-css-transition-group',
        amd: 'react-addons-css-transition-group'
      }
    }
  ]
}