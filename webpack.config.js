const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
require('dotenv').config()

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `app.bundle.[contenthash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/app.js',
    devtool: isProd ? false : 'source-map',
    output: {
        filename: `./assets/js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        clean: true,
        assetModuleFilename: 'assets/[path][name].[contenthash][ext]'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'app'),
        compress: true,
        port: process.env.PORT || 3333,
        host: process.env.HOST || '127.0.0.1',
        open: true,
        hot: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: `./assets/css/${filename('css')}`
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    [
                        "svgo",
                        {
                            plugins: extendDefaultPlugins([
                                {
                                    name: "removeViewBox",
                                    active: false,
                                },
                                {
                                    name: "addAttributesToSVGElement",
                                    params: {
                                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                    },
                                },
                            ]),
                        },
                    ],
                ],
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    }
}