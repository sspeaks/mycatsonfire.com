const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './static/playVideo.js',
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'playVideo.bundle.js'
    },
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules'),
        }
    }
};