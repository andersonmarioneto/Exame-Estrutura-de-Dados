

class Explorer {
    static ZOOMFACTOR = 1.1; // The factor by which zooming occurs

    constructor(canvas, graphicsBuffer, drawFunction, zoomFactor = Explorer.ZOOMFACTOR) {
        this.canvas = canvas;

        this.graphicsBuffer = graphicsBuffer;

        this.drawFunction = drawFunction;

        this.offsetX = 0;
        this.offsetY = 0;
        this.zoom = 1;

        this.zoomFactor = zoomFactor;

        this.graphicsBuffer.push();

        canvas.addEventListener("wheel", this.wheel.bind(this));
        canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    }

    reset() {
        this.offsetX = 0;
        this.offsetY = 0;
        this.zoom = 1;

        this.graphicsBuffer.pop();
        this.graphicsBuffer.push();

        this.drawFunction();
    }

    mouseMove(event) {
        if(mouseIsPressed) {
            var deltaX = (1/this.zoom) * event.movementX;
            var deltaY = (1/this.zoom) * event.movementY;

            this.graphicsBuffer.translate(deltaX, deltaY);

            this.offsetX += deltaX;
            this.offsetY += deltaY;

            this.drawFunction();
        }
    }

    wheel(event) {
        var deltaX = (CANVASWIDTH/2) - this.offsetX;
        var deltaY = (CANVASHEIGHT/2) - this.offsetY;
        var zoomFactor;

        if(event.deltaY < 0) {
            zoomFactor = this.zoomFactor
        } else if(event.deltaY > 0){
            zoomFactor = 1/this.zoomFactor
        } else {
            // In case of sideways scroll on trackpad
            zoomFactor = 1;
        }

        this.graphicsBuffer.translate(deltaX, deltaY);
        this.graphicsBuffer.scale(zoomFactor);
        this.graphicsBuffer.translate(-deltaX, -deltaY);

        this.zoom *= zoomFactor;

        this.drawFunction();

        return false; 
    }
}
