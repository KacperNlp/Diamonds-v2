import {canvas} from './Canvas.esm.js'

class MouseController{
    constructor(){
        this.posX = 0;
        this.posY = 0;

        this.state = 0;

        this.clicked = false;

        canvas.element.addEventListener('mousedown', this.#mousedownEvent)
    }

    #mousedownEvent = event =>{
        event.preventDefault();
        
        const offset = canvas.element.getBoundingClientRect();

        this.posX = event.clientX - offset.left;
        this.posY = event.clientY - offset.top;

        this.clicked = true;
    }
}

export const mouseController = new MouseController();