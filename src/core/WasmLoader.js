const CanvasKitInit = require('canvaskit-wasm/bin/canvaskit.js')

export default async function loadWasm(){
    return new Promise((resolve, reject) => {
        CanvasKitInit().ready().then((CanvasKit) => {
            resolve(CanvasKit);
        });
    });
}
