class Loader {
    constructor(){
        if (!Loader.instance){
            Loader.instance = this;
        }
        return Loader.instance;
    }

    initCanvas(CanvasKit, canvas){
        // CanvasKit and canvas are provided in this scope.
        const surface = CanvasKit.MakeCanvasSurface(canvas.id);
        if (!surface) {
        console.log('Could not make surface');
        return;
        }
        const context = CanvasKit.currentContext();
        const skcanvas = surface.getCanvas();

        let paint = new CanvasKit.SkPaint();
        paint.setAntiAlias(true);
        paint.setColor(CanvasKit.Color(0, 0, 0, 1.0));
        paint.setStyle(CanvasKit.PaintStyle.Stroke);
        paint.setStrokeWidth(4.0);
        // This effect smooths out the drawn lines a bit.
        paint.setPathEffect(CanvasKit.SkPathEffect.MakeCorner(50));

        // Draw I N K
        let path = new CanvasKit.SkPath();
        path.moveTo(80, 30);
        path.lineTo(80, 80);

        path.moveTo(100, 80);
        path.lineTo(100, 15);
        path.lineTo(130, 95);
        path.lineTo(130, 30);

        path.moveTo(150, 30);
        path.lineTo(150, 80);
        path.moveTo(170, 30);
        path.lineTo(150, 55);
        path.lineTo(170, 80);

        let paths = [path];
        let paints = [paint];

        function drawFrame() {
        CanvasKit.setCurrentContext(context);

        for (let i = 0; i < paints.length && i < paths.length; i++) {
            skcanvas.drawPath(paths[i], paints[i]);
        }
        skcanvas.flush();

        requestAnimationFrame(drawFrame);
        }

        let hold = false;
        canvas.addEventListener('mousemove', (e) => {
        if (!e.buttons) {
            hold = false;
            return;
        }
        if (hold) {
            path.lineTo(e.offsetX, e.offsetY);
        } else {
            paint = paint.copy();
            paint.setColor(CanvasKit.Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() + .2));
            paints.push(paint);
            path = new CanvasKit.SkPath();
            paths.push(path);
            path.moveTo(e.offsetX, e.offsetY);
        }
        hold = true;
        });
        requestAnimationFrame(drawFrame);

    }
}

export let loader = new Loader();