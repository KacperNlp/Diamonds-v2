import {WorkiWithHtml} from './WorkiWithHtml.esm.js'

const CANVAS_ID = 'js-game-map';
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;

class Canvas extends WorkiWithHtml{
    constructor(){
        super(CANVAS_ID)
        this.canvasConfiguration();
    }

    canvasConfiguration(){
        this.ctx = this.element.getContext('2d');
        this.ctx.canvas.width = CANVAS_WIDTH;
        this.ctx.canvas.height = CANVAS_HEIGHT;
    }

    drawCanvasBackground(){
        this.ctx.beginPath();

        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.ctx.fillStyle = '#000000';

        this.ctx.closePath();
    }
}


export const canvas = new Canvas();