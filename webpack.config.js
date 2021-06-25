const path = require('path');

const TerserJSPlugin = require('terser-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {

    return {
        mode: 'development',
        stats : 'minimal',
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
        },

        devServer: {
            port: 8080,
            writeToDisk: true,
            contentBase: path.resolve(__dirname, 'dist'),
            compress: true,
            hot: true,
            inline: true,
            historyApiFallback: {
                rewrites: [
                    {
                        from: /^.+$/,
                        to: '/',
                    },
                ],
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
            },
        },

        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: path.resolve(__dirname, 'src/index.html'),
            }),
        ],

        optimization: {
            minimizer: [new TerserJSPlugin({})],
        },

        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                },

            ],
        },
    };
};
