import {canvas} from './Canvas.esm.js';
import {DIAMOND_WIDTH, DIAMOND_HEIGHT, DIAMONDS_SPRITE} from './Diamond.esm.js'

export class DiamondSprite{
    constructor(posX, posY, row, column, numberOfKind, alpha){
        this.posX = posX;
        this.posY = posY;
        this.row = row;
        this.column = column;
        this.numberOfKind = numberOfKind;
        this.alpha = alpha;

    }

    drawDiamond(){

        if(this.alpha !== 255) canvas.ctx.globalAlpha = this.alpha/255;

        canvas.ctx.drawImage(
            DIAMONDS_SPRITE, 
            this.numberOfKind * DIAMOND_WIDTH,
            0,
            DIAMOND_WIDTH,
            DIAMOND_HEIGHT,
            this.posX,
            this.posY,
            DIAMOND_WIDTH,
            DIAMOND_HEIGHT,
        )

    }
}