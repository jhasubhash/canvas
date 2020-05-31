import Controller from './Controller';
class Loader {
    constructor(){
        if (!Loader.instance){
            Loader.instance = this;
        }
        return Loader.instance;
    }
    initHtmlCanvas(canvas){
        canvas.height = window.screen.height;
        canvas.width = window.screen.width;
        canvas.style.cursor = "crosshair";
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
    
}

export let loader = new Loader();