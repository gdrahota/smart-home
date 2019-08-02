const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        hash: true,
        template: './public/index.html',
        filename: 'index.html'
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      new CopyWebpackPlugin([
        { from: './public/config.js' }
      ])
    ]
  },
  devServer: {
    https: false
  }
}
