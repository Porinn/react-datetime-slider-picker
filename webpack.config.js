const path = require("path");

module.exports = {
    entry: {
        index: ["@babel/polyfill", "./example/App.jsx"]
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "example"),
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: "babel-loader",
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use:[ 'style-loader', 'css-loader' ]
        }]
    },
    mode: "production",
    plugins: [
    ],
    devServer: {
        contentBase: "./example",
        host: "0.0.0.0",
    }
};