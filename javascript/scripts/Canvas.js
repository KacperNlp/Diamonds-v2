import {WorkiWithHtml} from './WorkiWithHtml.esm.js'

const CANVAS_ID = 'js-game-map';
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;

class Canvas extends WorkiWithHtml{
    constructor(){
        super(CANVAS_ID)
    }

    configureCanvas(){
        this.ctx = this.element.getContext('2d');
        this.ctx.canvas.width = CANVAS_WIDTH;
        this.ctx.canvas.height = CANVAS_HEIGHT;
    }
}


export const canvas = new Canvas();