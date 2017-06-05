const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env) {

    // common configuration
    let config = {
        entry: {
            app: "./src/index.jsx"
        },
        output: {
            path: path.join(__dirname, "dist"),
            filename: "[name].js",
            publicPath: "/dist/"
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        module: {
            rules: [
                { test: /\.(js|jsx)$/, use: 'babel-loader' },
                { test: /\.js$/, use: 'source-map-loader', enforce: 'pre' }
            ]
        },
    };

    // is distribution build?
    let isDistBuild = (env === "dist");

    // source map configuration
    config.devtool = (isDistBuild)? "cheap-source-map" : "cheap-module-eval-source-map";

    // library configuration
    if (isDistBuild) {
        config.entry.libraries = ["react", "react-dom", "redux"];
        config.plugins = [new webpack.optimize.CommonsChunkPlugin({ name: "libraries" })];
    }

    // css configuration
    if (isDistBuild) {
        config.module.rules.push({test: /\.css$/, use: ExtractTextPlugin.extract({ use: "css-loader" })});
        config.plugins.push(new ExtractTextPlugin({ filename: '[name].css', allChunks: true }));
    } else {
        config.module.rules.push({ test: /\.css$/, use: ["style-loader", "css-loader"] });
    }

    // fully configured
    return config;
};