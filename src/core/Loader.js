import Listener from './Listeners';
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
        Listener.Init(CanvasKit, canvas);
    }
}

export let loader = new Loader();