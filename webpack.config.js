module.exports = {
    mode: 'development',
    output: {
        filename: 'prism.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};