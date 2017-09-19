const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    //devtool: 'cheap-source-map',  vtool: "cheap-module-source-map", // 生产环境推荐,
    context: __dirname + '/src',
    entry: './js/root.js',
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
                presets: ['react', 'es2015', 'latest', 'stage-0'],
                plugins: ['react-html-attrs']   //添加组件的插件配置
            }
        },
        {
            test:/\.css$/,
            // loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' //本地化使用
            loader: 'style-loader!css-loader'
        }
        ]
    }
};

module.exports = config;