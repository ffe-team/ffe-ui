const webpack = require('webpack')
const config = require('./webpack.site')
const devServer = require('webpack-dev-server')

const complier = webpack(config)

const server = new devServer(complier, {
  publicPath: '/',
  quiet: false,
  stats: { colors: true },
  hot: true,
  historyApiFallback: true,
})

server.listen(1992, '0.0.0.0', (err) => {
  console.log('start listen...');
})