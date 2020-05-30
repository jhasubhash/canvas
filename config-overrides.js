/* config-overrides.js */
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(
        new CopyPlugin( { 
            patterns: [
                { 
                    from: 'node_modules/canvaskit-wasm/bin/canvaskit.wasm',
                    to:'static/js/canvaskit.wasm'
                }
        ]}));

    config.node = {
        fs: 'empty'
    }
    return config;
}