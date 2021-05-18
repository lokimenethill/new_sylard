const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/bundle.js',
  },
  devServer: {
    contentBase: './public',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    useBuiltIns: 'usage',
                    targets: { chrome: 80 },
                    corejs: 3,
                  },
                ],
              ],
              plugins: [
                [
                  'module-resolver',
                  {
                    root: ['./'],
                    alias: {
                    //  '@client': './client',
                      "@server":"./server",
                      "@routes":"./server/routes",
                    "@s-config":"./server/config"
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/app.css',
    }),
  ],
};
