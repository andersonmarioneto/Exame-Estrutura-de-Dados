

class Tree {
    constructor(x, y, backgroundColor) {
        // The buffer that this tree, and all the nodes in the tree draw to
        this.graphicsBuffer = createGraphics(CANVASWIDTH, CANVASHEIGHT);

        // The root node; the upper level node of a binary tree
        this.root = new Node(this.graphicsBuffer);

        // A reference to a Controls instance
        this.controls = null;

        // The x and y coordinate that the root node is drawn at
        this.x = x;
        this.y = y;

        // The background color of the tree visualization
        this.backgroundColor = backgroundColor;

        // Various properties for tracking animations
        this.running = false; // Whether or not an animation is running
        this.timeout = null;  // The current timeout, so animations can be cancelled
        this.node = null;     // The current node being animated

        // Draw the tree upon creation (to show the background)
        this.draw();
    }

    bindControls(controls) {
        this.controls = controls;
    }

    // Resets the root node to an empty node, effectively clearing all nodes
    clear() {
        this.root = new Node(this.graphicsBuffer);
    }

    // Returns: a random number in the range [0, max) not yet in the tree
    uniqueRandom(max) {
        while(true) {
            var value = Math.floor(random(0, max));

            if(!this.search(value)) {
                return value;
            }
        }
    }

    // Quickly fills the tree with a certain number of nodes
    fill(count) {
        this.clear();

        for(var i = 0; i < count; i++) {
            var value = this.uniqueRandom(count);

            this.addValue(value);
        }

        this.draw();
    }

    addValue(value) {
        var shiftedNode = this.root.addValue(value);

        this.setCoordinates(shiftedNode);
    }

    // Wraps the Node class's search method directly
    search(value) {
        return this.root.search(value);
    }

    setCoordinates(node) {
        if(node === this.root) {
            node.setCoordinates(this.x, this.y);
        } else {
            node.setCoordinates();
        }
    }

    // Draws the entire visulizatino, including the background, and each node
    draw() {
        this.graphicsBuffer.background(this.backgroundColor);

        if(this.root.isFilled()) {
            this.root.draw();
        }

        this.updateDrawing();
    }

    updateDrawing() {
        image(this.graphicsBuffer, 0, 0);
    }

    // Wraps the Node class's resetVisuals method, and draws the result
    resetVisuals() {
        this.root.resetVisuals();

        this.draw();
    }

    startAnimation(frame, ...args) {
        if(this.running) {
            throw Error('Animation is currently running');
        } else {
            this.running = true;
            this.node = this.root;

            this.resetVisuals();

            this.continueAnimation(frame.bind(this), ...args)
        }
    }

    // Schedules the next frame of the animation
    continueAnimation(frame, ...args) {

        this.timeout = setTimeout(() => frame.bind(this)(...args),
            this.controls.animationInterval);
    }

    stopAnimation(complete = () => {}, ...callbackArgs) {
        this.running = false;
        this.node = null;

        clearTimeout(this.timeout);

        setTimeout(() => complete(...callbackArgs), this.controls.animationInterval);
    }

    addValueVisual(value, complete = () => {}, ...callbackArgs) {
        this.startAnimation(this.addValueFrame, value, complete, ...callbackArgs);
    }

    addValueFrame(value, complete, ...callbackArgs) {
        if(!this.node.isFilled()) {
            this.addValue(value);          // Add the value to the data structure

            this.node.paint(Node.SUCCESS); // Mark this node as inserted

            this.draw();                   // Show the tree with the new value

            this.stopAnimation(complete, ...callbackArgs);

        } else {
            this.node.paint(Node.VISITED); // Mark this node as visited

            this.updateDrawing();          // Display the new color

            // Determine the node for the next frame
            if(value < this.node.value) {
                this.node = this.node.leftNode;

            } else if(value > this.node.value) {
                this.node = this.node.rightNode;
            }

            // Schedule the next frame, passing in all arguments for the next call
            this.continueAnimation(this.addValueFrame, value, complete, ...callbackArgs)
        }
    }

    searchVisual(value, complete = () => {}, ...callbackArgs) {
        this.startAnimation(this.searchFrame, value, complete, ...callbackArgs);
        console.log('searching visually')
    }

    searchFrame(value, complete, ...callbackArgs) {
        if(this.node.color !== Node.VISITED) {
            // Mark the root node as visited first, then continue the search
            this.root.paint(Node.VISITED);

            this.updateDrawing();

            this.continueAnimation(this.searchFrame, value, complete, ...callbackArgs);

        } else if(!this.node.isFilled()) {
            // The value isn't in the tree, stop the animation

            this.stopAnimation(complete, ...callbackArgs);

        } else if(this.node.value === value) {
            // The value is in this node

            this.node.paint(Node.SUCCESS);  // Mark the node as found

            this.updateDrawing();           // Display the new color

            this.stopAnimation(complete, ...callbackArgs);

        } else {
            // The value may be in another node

            var nextHalf; // The half of the tree being searched next
            var cutHalf;  // The hal of the tree that can be cut from search

            // Set the two variables correctly
            if(value < this.node.value) {
                nextHalf = this.node.leftNode;
                cutHalf = this.node.rightNode;

            } else if(value > this.node.value) {
                nextHalf = this.node.rightNode;
                cutHalf = this.node.leftNode;
            }

            // Set the node for the next frame
            this.node = nextHalf;

            // Mark the half of the tree the node is not in, draw it
            cutHalf.recursivePaint(Node.FAILURE);
            cutHalf.draw();

            // Mark the next node as visited
            nextHalf.paint(Node.VISITED);

            // Display all the changes
            this.updateDrawing();

            this.continueAnimation(this.searchFrame, value, complete, ...callbackArgs);
        }
    }

    fillVisual(count, complete = () => {}) {
        this.clear();

        this.startAnimation(this.fillFrame, count, 0, complete);
    }

    fillFrame(count, filled, complete) {
        if(filled === count) {
            // Stop the animation if the correct number of nodes were inserted
            this.stopAnimation(complete);
        } else {
            // Temporarily stop the fill animation to start the addValue animation
            this.stopAnimation();

            var value = this.uniqueRandom(count);

            this.startAnimation(this.addValueFrame, value,
                this.fillFrame.bind(this), count, filled + 1, complete);
        }
    }
}
