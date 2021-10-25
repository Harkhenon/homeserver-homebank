// Think to add some postcss plugins

const webpack = require('webpack');
// Node import
const path = require('path');

// Plugins de traitement pour dist/
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Config pour le devServer
const host = 'localhost';
const port = 8082;

// Config de Webpack
module.exports = {
  // Passe le build par dèfaut en déeveloppement
  mode: 'development',
  // Expose le dossier src/ pour les imports
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  // Points d'entrée pour le travail de Webpack
  entry: {
    app: [
      './src/styles/index.scss',
      './src/index.js',
    ],
  },
  // Sortie
  output: {
    filename: '[name].js',
    chunkFilename: 'vendors.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  // Optimisation pour le build
  optimization: {
    // Code spliting
    splitChunks: {
      chunks: 'all',
    },
    // Minification
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  // Modules
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // babel avec une option de cache
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      // CSS / SASS / SCSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          // SASS
          'sass-loader',
        ],
      },
      // Images
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [{
          loader: 'img-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'img/',
          }
        }],
      },
      // fonts
      {
        test: /\.(ttf|otf|eot|woff2?)(\?[a-z0-9]+)?$/,
        exclude: /medias/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              name: '[name][hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    liveReload: true, // progression du build en console
    open: true, // on ouvre le navigateur
    historyApiFallback: true,
    host: host,
    port: port,
  },
  
  plugins: [
    // Permet de prendre le index.html de src comme base pour le fichier de dist/
    new HtmlWebPackPlugin({
      title: 'Homebank',
      template: './src/index.html',
      filename: './index.html',
      'meta': {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'charset': 'utf-8',
        'theme-color': '#4285f4'
      }
    }),
    // Permet d'exporter les styles CSS dans un fichier css de dist/
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
