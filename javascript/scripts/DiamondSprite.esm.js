import {canvas} from './Canvas.esm.js';
import {DIAMOND_WIDTH, DIAMOND_HEIGHT} from './Diamond.esm.js'
import {EMPTY_BLOCK} from '../gameData/gameLevels.esm.js'

export class DiamondSprite{
    constructor(posX, posY, row, column, numberOfKind, alpha){
        this.posX = posX;
        this.posY = posY;
        this.row = row;
        this.column = column;
        this.numberOfKind = numberOfKind;
        this.alpha = alpha;

    }

    drawDiamond(diamondSprite){

        if(this.numberOfKind === EMPTY_BLOCK ) return;

        if(this.alpha !== 255) canvas.ctx.globalAlpha = this.alpha/255;
        console.log()

        canvas.ctx.drawImage(
            diamondSprite,
            this.numberOfKind * DIAMOND_WIDTH,
            0,
            DIAMOND_WIDTH,
            DIAMOND_HEIGHT,
            this.posX + 50, 
            this.posY,
            DIAMOND_WIDTH,
            DIAMOND_HEIGHT,
        )

    }
}