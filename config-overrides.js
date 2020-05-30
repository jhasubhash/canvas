/* config-overrides.js */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    // Make file-loader ignore WASM files
    const wasmExtensionRegExp = /\.wasm$/;
    // config.resolve.extensions.push('.wasm');
    /*config.module.rules.forEach(rule => {
        (rule.oneOf || []).forEach(oneOf => {
            if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
                oneOf.exclude.push(wasmExtensionRegExp);
            }
        });
    });*/
/*
    config.output = {
        publicPath: "/canvas/"
    }*/
    /*console.log(path.resolve(__dirname, 'node_modules/canvaskit-wasm/bin/*.wasm'));
    console.log(path.resolve(__dirname, 'build/static/media') );
    config.plugins.push(new CopyPlugin([{
        from: path.resolve(__dirname, 'node_modules/canvaskit-wasm/bin'), 
        to: path.resolve(__dirname, 'build/static/media')
    }]));*/
    config.plugins.push(
        new CopyPlugin( { 
            patterns: [
                { 
                    from: 'node_modules/canvaskit-wasm/bin/canvaskit.wasm',
                    to:'static/js/canvaskit.wasm'
                }
        ]}));

    /*config.module.rules.push({
        test: wasmExtensionRegExp,
        type: "javascript/auto",
        use: [{ loader: require.resolve('file-loader'), options: {
            name: path.resolve(__dirname,'src/[name].[ext]')
        } }]
    });*/

    config.node = {
        fs: 'empty'
    }
    return config;
  }