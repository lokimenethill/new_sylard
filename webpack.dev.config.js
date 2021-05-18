const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // plugins:[new ESLintPlugin(options)],
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8080,
    host: 'localhost',
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
                   //   '@client': './client',
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
    new MiniCssExtractPlugin({ filename: 'styles/app.css' }),
    new ESLintPlugin(),
  ],
};
