
// const CanvasKitInitModule = require('../canvaskit.wasm');
const CanvasKitInit = require('canvaskit-wasm/bin/canvaskit.js')
// import CanvasKitInitModule from '../../node_modules/canvaskit-wasm/bin/canvaskit.wasm';
export default async function loadWasm(){
    // const exports_ = await import('../../node_modules/canvaskit-wasm/bin/canvaskit.js');
    /*exports_.default({
        locateFile: function(path){
            if(path.endsWith('.wasm')) {
                return CanvasKitInitModule;
                }
                return path;
        },
        }).ready().then((CanvasKit) => {
            this.canvasKit = CanvasKit;
            this.loader.initCanvas(this.canvasKit, this.canvas);
    });*/
    return new Promise((resolve, reject) => {
        /*const WasmModule = {
            locateFile: function (path) {
                if(path.endsWith('.wasm')) {
                    return CanvasKitInitModule;
                    }
                    return path;
            }
        };
        exports_.default(WasmModule).then((Module)=>{
            delete Module['then'];
            resolve(Module);
        });*/
        /*exports_.default({
            locateFile: function(path){
                if(path.endsWith('.wasm')) {
                    return CanvasKitInitModule;
                    }
                    return path;
            },
            }).ready().then((CanvasKit) => {
                resolve(CanvasKit);
        })*/
        /*exports_.default({
            locateFile: function(path){
                if(path.endsWith('.wasm')) {
                    //return 'node_modules/canvaskit-wasm/bin/canvaskit.wasm';
                    return CanvasKitInitModule;
                    }
                    return path;
            }
        }).ready().then((CanvasKit) => {
            resolve(CanvasKit);
            // Code goes here using CanvasKit
        })*/
        CanvasKitInit().ready().then((CanvasKit) => {
            // Code goes here using CanvasKit
            resolve(CanvasKit);
        });
    });
}
