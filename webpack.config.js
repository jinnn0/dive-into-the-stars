let path = require('path')

module.exports = {
  entry: './src/scripts/app.js',
  output: {
    filename: 'App.js',
    path: path.resolve(__dirname, './temp/scripts')
  },
  mode: 'development',
  devtool: 'none',
  watch: true 
}




