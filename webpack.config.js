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
                            options: { outputPath: 'css/', name: '[name].css' },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        devServer: {
            contentBase: path.join(__dirname, 'static'),
            port: 4444,
            publicPath: '/assets',
        },
        output: {
            path: __dirname + '/build',
            filename: 'js/bundle.js',
        },
    },
];
