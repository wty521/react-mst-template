const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// webpack plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

//
const basicConfig = require('./webpack.base');
const ROOT_PATH = path.resolve(__dirname, '../');

// 定义webpack配置合并策略
const prodMerge = merge.strategy({
    'entry': 'prepend',
    'plugins': 'prepend',
    'module': 'append'
});


module.exports = prodMerge(basicConfig, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.join(ROOT_PATH, '/public'),
        publicPath: '/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
    },
    module: {
        rules: [
            {
                test: /(\.css$)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]

            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
        new CopyWebpackPlugin([
            {
              from: './dll/pro',
              to: 'js',
            },
        ]),
        new HtmlWebpackPlugin({
            title: 'quick-start',
            template: './index.html',
        }),
        new HtmlIncludeAssetsPlugin({
            assets: [`dll/${require('../dll/pro/vendor-manifest.json').name}.js`],
            append: false
        }),
        new webpack.DllReferencePlugin({
            context: ROOT_PATH,
            manifest: require(ROOT_PATH + '/dll/pro/vendor-manifest.json'),
            sourceType: 'var',
        }),
    ],
});
