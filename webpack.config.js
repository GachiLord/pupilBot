const path = require('path');


module.exports = {
  entry: {
      app: './src/app.js',
      popup: './src/popup.js',
      process: './src/process.js',
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  experiments:{
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$|\.css/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  }
};