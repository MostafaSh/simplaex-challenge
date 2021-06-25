const TerserJSPlugin = require('terser-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {

    return {
        mode: 'development',
        stats: 'minimal',
        entry: {
            rivraddon: '/src/core/rivraddon.js',
            prebid: '/src/core/prebid.js'
        },
        output: {
            filename: '[name]-[fullhash].js',
            path: '/dist',
        },

        devServer: {
            port: 8080,
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './src/assets/index.html',
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
