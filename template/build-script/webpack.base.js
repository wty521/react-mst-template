const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const babelConfig = require('./babel.config');
// const config = require('../config');
// const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = {
    entry: ['./src/index.jsx'],
    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less']
    },
    module: {
        rules: [
            {
                test: /\.jsx?|tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        ...babelConfig
                    }
                },
            },
            {
                test: /(\.css$)/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg|woff|eot|ttf|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    name: 'static/[name].[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].[hash].css')
    ]
};
