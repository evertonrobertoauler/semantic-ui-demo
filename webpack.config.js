const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lodash = require('lodash');

const uglify = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  compress: { warnings: false },
  output: { comments: false }
});

const PRODUCTION = process.env.ENV === 'production';

const plugins = lodash.filter([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.ENV || 'development')
  }),
  new webpack.NoEmitOnErrorsPlugin(),
]);

const browserPlugins = lodash.filter(plugins.concat([
  new ExtractTextPlugin('browser.css'),
  PRODUCTION ? uglify : null
]));

module.exports = [
  {
    entry: './src/server.tsx',
    output: {
      filename: 'server.js',
      path: path.join(__dirname, 'dist')
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    target: 'node',
    devtool: 'source-map',
    externals: [nodeExternals({ whitelist: [] })],
    module: {
      loaders: [
        {
          test: /\.(ts|tsx)$/, exclude: /node_modules/, use: [
            { loader: 'ts-loader', options: { configFileName: 'tsconfig.server.json' } },
            { loader: 'tslint-loader', options: { typeCheck: true, tsConfigFile: 'tsconfig.server.json' } }
          ]
        }
      ]
    },
    plugins: plugins
  },
  {
    entry: './src/browser.tsx',
    output: {
      filename: 'browser.js',
      path: path.join(__dirname, 'dist', 'public')
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    target: 'web',
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.(ts|tsx)$/, exclude: /node_modules/, use: [
            { loader: 'ts-loader', options: { configFileName: 'tsconfig.browser.json' } },
            { loader: 'tslint-loader', options: { typeCheck: true, tsConfigFile: 'tsconfig.browser.json' } }
          ]
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { minimize: PRODUCTION } },
              'sass-loader'
            ]
          })
        },
        {
          test: /.(svg|ttf|woff|woff2|eot|png)/,
          use: {
            loader: 'file-loader', query: { name: 'assets/[name].[hash:8].[ext]' }
          }
        }
      ]
    },
    plugins: browserPlugins
  }
];
