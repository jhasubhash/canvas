
let zoomIntensity = 0.2;
let scale = 1;
let originx = 0;
let originy = 0;

class Controller {
    constructor(){
        if (!Controller.instance){
            Controller.instance = this;
            this.canvasKit = null;
            this.paints = [];
            this.paths = [];
            this.hold = false;
            this.path = null;
            this.strokeColor = {'r':0,'g':0,'b':0,'a':1};
            this.strokeWidth = 1;
        }
        return Controller.instance;
    }

    Init(canvaskit, canvas){
        this.canvasKit = canvaskit;
        this.canvas = canvas
        this.surface = this.canvasKit.MakeCanvasSurface(this.canvas.id);
        this.context = this.canvasKit.currentContext();
        this.skcanvas = this.surface.getCanvas();
        this.opacityVal = 1;
        this.addListeners();
        this.drawFrame();
    }

    setOpacity(val){
        this.opacityVal = val;
    }

    getOpacity(){
        return this.opacityVal;
    }

    setStrokeWidth(val){
        this.strokeWidth = val;
    }

    getStrokeWidth(){
        return this.strokeWidth;
    }

    setStrokeColor(val){
        this.strokeColor = val;
    }

    getStrokeColor(){
        return this.strokeColor;
    }
    addListeners(){
        this.canvas.addEventListener('mousemove', this.onMouseMove);
        this.canvas.addEventListener('wheel', this.onMouseWheel, false);
    }

    clearCanvas(){
        this.paths = [];
        this.paints = [];
        this.skcanvas.clear({'r':255,'g':255,'b':255,'a':1});
        this.drawFrame();
    }

    undo(){
        if(this.paths.length)
            this.paths.pop();
        if(this.paints.length)
            this.paints.pop();
    }

    onMouseWheel = (e) => {
        e.preventDefault();
        if (e.ctrlKey) {
            // Get mouse offset.
            let mousex = e.clientX - this.canvas.offsetLeft;
            let mousey = e.clientY - this.canvas.offsetTop;
            // Normalize wheel to +1 or -1.
            let wheel = e.deltaY < 0 ? 1 : -1;

            // Compute zoom factor.
            let zoom = Math.exp(wheel*zoomIntensity);
            
            // Translate so the visible origin is at the context's origin.
            this.skcanvas.translate(originx, originy);
        
            // Compute the new visible origin. Originally the mouse is at a
            // distance mouse/scale from the corner, we want the point under
            // the mouse to remain in the same place after the zoom, but this
            // is at mouse/new_scale away from the corner. Therefore we need to
            // shift the origin (coordinates of the corner) to account for this.
            originx -= mousex/(scale*zoom) - mousex/scale;
            originy -= mousey/(scale*zoom) - mousey/scale;
            
            // Scale it (centered around the origin due to the trasnslate above).
            this.skcanvas.scale(zoom, zoom);
            // Offset the visible origin to it's proper position.
            this.skcanvas.translate(-originx, -originy);

            // Update scale and others.
            scale *= zoom;
           // visibleWidth = width / scale;
           // visibleHeight = height / scale;
        } else {
        // Your trackpad X and Y positions
            originx += e.deltaX/scale;
            originy += e.deltaY/scale;
            this.skcanvas.translate(-e.deltaX/scale, -e.deltaY/scale);
        }
    }
    
    onMouseMove = (e) => {
        if (!e.buttons) {
            this.hold = false;
            return;
        }
        let mousex = originx + e.offsetX/scale;
        let mousey = originy + e.offsetY/scale;
        if (this.hold) {
            this.paths[this.paths.length - 1].lineTo(mousex, mousey);
        } else {
            let paint = new this.canvasKit.SkPaint();
            paint.setAntiAlias(true);
            let clr = this.strokeColor;
            paint.setColor(this.canvasKit.Color(clr.r, clr.g, clr.b, clr.a));
            paint.setStyle(this.canvasKit.PaintStyle.Stroke);
            paint.setStrokeWidth(this.strokeWidth);
            paint.setPathEffect(this.canvasKit.SkPathEffect.MakeCorner(50));
            this.paints.push(paint);
            let path = new this.canvasKit.SkPath();
            this.paths.push(path);
            path.moveTo(mousex, mousey);
        }
        this.hold = true;
    }

    drawFrame = ()=>{
        this.canvasKit.setCurrentContext(this.context);
        for (let i = 0; i < this.paints.length && i < this.paths.length; i++) {
            this.skcanvas.drawPath(this.paths[i], this.paints[i]);
        }
        this.skcanvas.flush();
        requestAnimationFrame(this.drawFrame);
    }

}
export default new Controller();