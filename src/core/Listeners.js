
let zoomIntensity = 0.2;
let scale = 1;
let originx = 0;
let originy = 0;
let visibleWidth = 0;
let visibleHeight = 0;

class Listener {
    constructor(){
        if (!Listener.instance){
            Listener.instance = this;
            this.canvasKit = null;
            this.paints = [];
            this.paths = [];
            this.hold = false;
            this.path = null;
        }
        return Listener.instance;
    }

    Init(canvaskit, canvas){
        this.canvasKit = canvaskit;
        this.canvas = canvas
        this.surface = this.canvasKit.MakeCanvasSurface(this.canvas.id);
        this.context = this.canvasKit.currentContext();
        this.skcanvas = this.surface.getCanvas();
        this.addListeners();
        this.drawFrame();
    }

    addListeners(){
        this.canvas.addEventListener('mousemove', this.onMouseMove);
        this.canvas.addEventListener('wheel', this.onMouseWheel, false);
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
            paint.setColor(this.canvasKit.Color(0, 0, 0, 1.0));
            paint.setStyle(this.canvasKit.PaintStyle.Stroke);
            paint.setStrokeWidth(2.0);
            paint.setPathEffect(this.canvasKit.SkPathEffect.MakeCorner(50));
            paint.setColor(this.canvasKit.Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() + .2));
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
export default new Listener();