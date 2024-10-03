const path = require('path')
const copyPlugin = require('copy-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')
module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'),
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i,
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve('src/assets/manifest.json'), 
                    to: path.resolve('dist') 
                },
                { 
                    from: path.resolve('src/assets/icons.png'), 
                    to: path.resolve('dist') 
                },
            ],
        }),
        new HtmlPlugin({
            title: 'ReactJS Boilerplate',
            filename: 'popup.html',
            chunks: ['popup']
        })
        ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js'
    }
}