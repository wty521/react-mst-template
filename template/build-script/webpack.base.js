const path = require('path');

const babelConfig = require('./babel.config');

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
        // new MiniCssExtractPlugin('css/[name].[hash].css')
    ]
};
