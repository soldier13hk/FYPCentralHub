const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require("path");

var SRC_DIR = path.resolve(__dirname);

module.exports = [
    {
        entry: SRC_DIR+'/server.js',
        output: {
            path: SRC_DIR,
            filename: 'server.bundle.js',
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }]
        },
        target: 'node',
        externals: [nodeExternals()]
        //If you want to minify your files uncomment this
        // ,
        // plugins: [
        //     new webpack.optimize.UglifyJsPlugin({
        //         compress: {
        //             warnings: false,
        //         },
        //         output: {
        //             comments: false,
        //         },
        //     }),
        // ]
    },
    {
        entry: SRC_DIR+'/views/index.js',
        output: {
            path: SRC_DIR+'/bin',
            filename: 'app.bundle.js',
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }]
        }
        //If you want to minify your files uncomment this
        // ,
        // plugins: [
        //     new webpack.optimize.UglifyJsPlugin({
        //         compress: {
        //             warnings: false,
        //         },
        //         output: {
        //             comments: false,
        //         },
        //     }),
        // ]
    },
    {
        entry: SRC_DIR + '/views/timerSwitches.js',
        output: {
            path: SRC_DIR + '/bin',
            filename: 'app2.bundle.js'
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }]
        }
    },
    {
        entry: SRC_DIR + '/views/securityCamera.js',
        output: {
            path: SRC_DIR + '/bin',
            filename: 'app3.bundle.js'
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }]
        }
    }
]
