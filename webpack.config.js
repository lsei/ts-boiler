const path = require('path');

module.exports = [
    {
        mode: 'development',
        entry: './src/index.ts',
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
            ],
        },
        devServer: {
            contentBase: path.join(__dirname, 'static'),
            port: 4444,
            publicPath: '/assets/js',
        },
        output: {
            path: __dirname + '/build',
            filename: 'bundle.js',
        },
    },
];
