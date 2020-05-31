import Controller from './Controller';
class Loader {
    constructor(){
        if (!Loader.instance){
            Loader.instance = this;
            this.canvas = null;
        }
        return Loader.instance;
    }
    initHtmlCanvas(canvas){
        canvas.height = window.screen.height;
        canvas.width = window.screen.width;
        canvas.style.cursor = "crosshair";
        this.canvas = canvas;
    }

    initCanvas(CanvasKit, canvas){
        this.initHtmlCanvas(canvas);
        Controller.Init(CanvasKit, canvas);
    }

    setOpacity(val){
        Controller.setOpacity(val);
    }

    getOpacity(){
        return Controller.getOpacity();
    }

    setStrokeWidth(val){
        Controller.setStrokeWidth(val);
    }

    getStrokeWidth(){
        return Controller.getStrokeWidth();
    }

    setStrokeColor(val){
        Controller.setStrokeColor(val);
    }

    getStrokeColor(){
        return Controller.getStrokeColor();
    }

    clearCanvas(){
        Controller.clearCanvas();
    }

    undo(){
        Controller.undo();
    }

    startPan(){
        this.canvas.style.cursor = "grab";
        Controller.startPan();
    }
    
    endPan(){
        this.canvas.style.cursor = "crosshair";
        Controller.endPan();
    }
    
}

export let loader = new Loader();