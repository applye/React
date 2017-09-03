const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    //devtool: 'eval-source-map',  //开发阶段使用的模式， devtool: "cheap-module-source-map", // 生产环境推荐,
    context: __dirname + '/src',
    entry: './js/index.js',
    devServer: {
        historyApiFallback: true,
        port: 8081
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude:/(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'latest']
            }

        }]
    }
};

module.exports = config;