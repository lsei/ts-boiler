const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = [
    {
        mode: 'development',
        entry: ['./src/ts/index.ts', './src/scss/index.scss'],
        target: 'web',
        devtool: 'inline-source-map',
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
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'assets/css/',
                                name: '[name].css',
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'static'),
            },
            port: 4444,
        },
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'assets/js/bundle.js',
        },
        plugins: [
            new CopyPlugin({
                patterns: [{ from: 'static', to: '' }],
            }),
        ],
    },
];
