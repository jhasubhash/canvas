import loadWasm from '../core/WasmLoader'
export class CanvasModel {
    constructor() {
        this.canvasKit = null;
        this.canvas = null;
        this.loader = null;
    }

    loadCanvasKit(canvas, loader){
        this.canvas = canvas;
        this.loader = loader;
        loadWasm().then((CanvasKit) => {
            this.canvasKit = CanvasKit;
            this.loader.initCanvas(this.canvasKit, this.canvas);
        });
    }
}