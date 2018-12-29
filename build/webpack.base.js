'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getHtmlTemplate(name, title) {
    return {
        template: path.resolve(__dirname, '../src/view/' + name + '.html'),
        filename: 'views/' + name + '.html',
        chunks: ['vendor', 'common', name],
        inject: true,
        title: title,
        minify: {
            removeCommonts: true,
            collapseWhitespace: true
        },
        hash: true
    }
}

module.exports = {
    entry: {
        a: path.resolve(__dirname, '../src/pages/a/a.js'),
        b: path.resolve(__dirname, '../src/pages/b/b.js'),
        c: path.resolve(__dirname, '../src/pages/c/c.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                include: path.resolve(__dirname, '../src'),
                use: [
                    'eslint-loader'
                ]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 300,//超过多少大小才会单独抽取打包，默认为300k，这里为了看效果，设为0
                    minChunks: 2,//被引用几次才单独抽取，默认为1
                    priority: 0//单独打包优先级，数越大优先级越高
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 10
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin(getHtmlTemplate('a', 'A页面')),
        new HtmlWebpackPlugin(getHtmlTemplate('b', 'B页面')),
        new HtmlWebpackPlugin(getHtmlTemplate('c', 'C页面'))
    ]
    // 我加一行
}
