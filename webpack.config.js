const path = require('path');

module.exports = {
    entry: {
        app: './client/index.js'
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, './public/javascripts')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devServer: {
        port: 1337,
        open: true,
        proxy: 'http://localhost:3000'
    },
};