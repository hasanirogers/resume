// reference: https://github.com/web-padawan/polymer3-webpack-starter/blob/ff1ea616e2a4f1853e193efea5cc4f1311acd74b/webpack.config.js
'use strict';

const { resolve, join } = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ENV = process.argv.find(arg => arg.includes('production')) ? 'production' : 'development';
const OUTPUT_PATH = resolve('public');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }
];

const stylelint = {
  context: './src',
  failOnError: true
}

const commonConfig = merge([
  {
    entry: ['./src/scripts/app.js', './src/scss/app.scss'],

    output: {
      path: join(__dirname, 'public/app'),
      filename: 'app.js'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          // We need to transpile Polymer,so whitelist packages containing ES modules
          exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|@polymer|@vaadin)\/).*/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                //extends: join(__dirname + '/.babelrc'),
                cacheDirectory: true,
                envName: ENV
              }
            }
            // {
            //   loader: 'uglify-template-string-loader'
            // }
          ]
        },

        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {sourceMap: true}
            },
            {
              loader: "postcss-loader",
              options: {sourceMap: true}
            },
            {
              loader: "sass-loader",
              options: {sourceMap: true}
            }
          ]

        }
      ]
    }
  }
]);

const developmentConfig = merge([
  {
    devtool: 'cheap-module-source-map',
    plugins: [
      new CopyWebpackPlugin(polyfills),
      new StyleLintPlugin(stylelint),
      new MiniCssExtractPlugin({filename: "app.css"})
    ]
  }
]);

module.exports = mode => {
  return merge(commonConfig, developmentConfig, { mode });
};
