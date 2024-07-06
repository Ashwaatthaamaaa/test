const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: (pathData) => {
        const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
        return `${filepath}/[name].[hash][ext][query]`;
      },    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: './dist',
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Project Template',
        template: './src/index.html',
        inject: 'body',
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext][query]'
          }
        },
      ],
    },
    optimization: {
      minimize: isProduction,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
};



// Run a development server with npm run dev
// Build for development with npm run build:dev
// Build for production with npm run build
// Deploy to GitHub Pages with npm run deploy