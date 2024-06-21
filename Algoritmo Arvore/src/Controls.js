
class Controls {
    
    static CLEARID = "clear-btn";
    static ADDID = "add-btn";
    static REMOVEID = "remove-btn"; 
    static SLIDERID = "speed-slider";

    static NODELIMIT = 500;

    constructor(tree) {
        this.tree = tree;
        this.tree.bindControls(this);  

        this.animationInterval = null; 
        this.clearBtn = document.getElementById(Controls.CLEARID);
        this.addBtn = document.getElementById(Controls.ADDID);
        this.removeBtn = document.getElementById(Controls.REMOVEID); 
        this.speedSlider = document.getElementById(Controls.SLIDERID);

        this.setAnimationSpeed();

        this.clearBtn.addEventListener('click',
            () => this.triggerAnimation(this.clear));
        this.addBtn.addEventListener('click',
            () => this.triggerAnimation(this.add));
        this.removeBtn.addEventListener('click',
            () => this.triggerAnimation(this.remove));

        this.speedSlider.addEventListener('input    ', this.setAnimationSpeed.bind(this));
    }

    clear() {
        this.tree.clear();
        this.tree.stopAnimation(() => {})
        this.tree.draw();
    }

    triggerAnimation(animation) {
        if(this.tree.running) {
            alert('Please wait for the current animation to finish');
        } else {
            animation.bind(this)();
        }
    }

    getNumber(text) {
        var value = prompt(text);

        if(value === null) {
            return null;
        } else if(isNaN(parseInt(value)) || value === "" || parseInt(value) < 0) {
            alert('Please enter a positive integer');
            return null;
        } else {
            return parseInt(value);
        }
    }

    add() {
        var value = this.getNumber("Adicionar node: ");

        if(value !== null && this.tree.search(value)) {
            alert(value + ' Esse node já existe');
        } else if(value !== null){
            this.tree.addValueVisual(value);
        }
    }

    remove() {
        var value = this.getNumber("Remover node: ");

        if(value !== null && !this.tree.search(value)) {
            alert(value + ' Esse node não existe');
        } else if(value !== null){
            this.tree.removeValueVisual(value);
        }
    }

    setAnimationSpeed() {
        this.animationInterval= 1000/Math.pow(10, this.speedSlider.value);
    }
}
