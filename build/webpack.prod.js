'use strict';

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            //压缩css后默认压缩js失效，手动压缩js
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            //压缩css
            new OptimizeCSSAssetsPlugin()
        ]
    },
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].chunk.[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '..')}),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[content].css'
        })
    ]
})
