module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.sass']
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  }
}