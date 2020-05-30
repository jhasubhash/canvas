
import {loader} from '../core/Loader';
import loadWasm from '../core/WasmLoader'
export class CanvasModel {
    constructor() {
        this.canvasKit = null;
        this.canvas = null;
    }

    loadCanvasKit(canvas){
        this.canvas = canvas;
        loadWasm().then((CanvasKit) => {
            this.canvasKit = CanvasKit;
            loader.initCanvas(this.canvasKit, this.canvas);
        });
    }
}