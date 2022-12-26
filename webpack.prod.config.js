const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

module.exports = [
    {
        mode: 'production',
        entry: ['./src/ts/index.ts', './src/scss/index.scss'],
        target: 'web',
        resolve: {
            extensions: ['.js', '.ts'],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /src/,
                    use: [{ loader: 'ts-loader' }],
                },
                {
                    test: /\.(glsl|vert|frag)$/,
                    use: 'raw-loader',
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]

                },
            ],
        },
        output: {
            path: __dirname + '/build',
            filename: 'assets/js/bundle.[contenthash].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                publicPath: '/',
            }),
    
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].[contenthash].css'
            }),
            new CopyPlugin({
                patterns: [{ from: 'static', to: '' }],
            }),
        ],
    },
];
