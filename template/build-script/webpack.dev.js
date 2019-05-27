const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// webpack plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basicConfig = require('./webpack.base');
const ROOT_PATH = path.resolve(__dirname, '../');

// 定义webpack配置合并策略
const devStrategyMerge = merge.strategy({
    'entry': 'prepend',
    'plugins': 'prepend',
    'module': 'append'
});

// dev import dll to faster build
module.exports = devStrategyMerge(
    basicConfig,
    {
        entry: [
            'webpack-hot-middleware/client?reload=true'
        ],
        mode: 'development',
        devtool: '#source-map',
        output: {
            path: path.join(ROOT_PATH, '/public'),
            publicPath: '/',
            filename: 'js/[name].js',
        },
        module: {
            rules: [
                // dev 环境不需要抽离 css。for 加快编译速度，以及 css 热更新
                {
                    test: /\.less$/,
                    use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin('css/[name].[hash].css'),
            new HtmlWebpackPlugin({
                title: 'quick-start',
                template: './index.html',
                filename: 'index.html'
            }),
            new HtmlIncludeAssetsPlugin({
                assets: [`dll/dev/${require('../dll/dev/vendor-manifest.json').name}.js`],
                append: false //append vendor.js to html
            }),

            new webpack.DllReferencePlugin({
                context: ROOT_PATH,
                manifest: require('../dll/dev/vendor-manifest.json'),
                sourceType: 'var',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
    }
);
