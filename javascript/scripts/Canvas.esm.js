import {WorkiWithHtml} from './WorkiWithHtml.esm.js'

const CANVAS_ID = 'js-game-map';
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

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
        this.ctx.fillStyle = '#313131';

        this.ctx.closePath();
    }
}

export const GAME_BOARD_OFFSET_Y = 20;
export const GAME_BOARD_OFFSET_X = 100;
export const canvas = new Canvas();