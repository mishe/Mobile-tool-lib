var webpack = require("webpack"),
    dev_server = require("webpack-dev-server"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    args = process.argv,
    debug = args.indexOf("--debug") > -1,
    build_realse = args.indexOf("--prd") > -1,
    build_test = args.indexOf("--test") > -1,
    pkg = require("./package.json"),
    ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
    logConfig = {
        hash: true,
        version: false,
        assets: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        cached: false,
        reasons: false,
        source: false,
        errorDetails: false,
        chunkOrigins: false,
        modulesSort: false,
        chunksSort: false,
        assetsSort: false
    },

    _config = {
        entry:{
            app:['./source/main.js']
        },
        output: {

            path: __dirname + "/dist/",
            filename: "bundle_" + pkg.version + (build_realse ? ".min.js" : ".js"),
            chunkFilename:'chunk_[name]'+build_realse ?'/[chunkhash:4]':''+'.js'
        },
        module: {
            loaders: [
                {
                    test: /\.html$/,
                    loader: "html-clean!html-loader?minimize=false"
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                },
                {
                    test: /\.(png|jpg|svg|gif|eot|woff|ttf)$/,
                    loader: 'url-loader?limit=4096&name=[path][hash:8].[ext]'
                }]
        }
        , plugins: [
            new ExtractTextPlugin("bundle_" + pkg.version + (!debug ? ".min.css" : ".css"))
        ]
    },
    compiler, server;

if(debug){
    _config.devtool= 'cheap-module-source-map';
    _config.entry.app.push('webpack/hot/dev-server');
    _config.entry.app.push('webpack-dev-server/client?http://localhost:8088');
    _config.plugins.push(new webpack.HotModuleReplacementPlugin());
}else if(build_test) {
    _config.output.publicPath='https://statictest.91yaowang.com/yaowang/dist/';
    _config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}else if(build_realse) {
    _config.output.publicPath='https://file.91yaowang.com/yaowang/dist/';
    _config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    _config.plugins.push(new ChunkManifestPlugin({
            filename: "manifest.json",
            manifestVariable: "webpackManifest"
        })
    )
}

compiler = webpack(_config);

if (debug) {
    server = new dev_server(compiler, {
        hot: true,
        inline:true,
        stats: { colors: true }
    });
    server.listen(8088);
} else {
    compiler.run(function (err, status) {
        if (err) {
            console.warn(err);
        }
        console.log(status.toJson(logConfig));
    });
}
