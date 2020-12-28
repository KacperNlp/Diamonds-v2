import {canvas} from './Canvas.esm.js';
import {DIAMOND_WIDTH, DIAMOND_HEIGHT} from './Diamond.esm.js'
import {EMPTY_BLOCK} from '../gameData/gameLevels.esm.js'


export class DiamondSprite{
    constructor(posX, posY, row, column, kind, alpha){
        this.posX = posX;
        this.posY = posY;
        this.row = row;
        this.column = column;
        this.kind = kind;
        this.alpha = alpha;

    }

    drawDiamond(diamondSprite){

        if(this.kind === EMPTY_BLOCK ) return;

        if(this.alpha !== 255) canvas.ctx.globalAlpha = this.alpha/255;
        console.log()

        canvas.ctx.drawImage(
            diamondSprite,
            this.kind * DIAMOND_WIDTH,
            0,
            DIAMOND_WIDTH,
            DIAMOND_HEIGHT,
            this.posX, 
            this.posY,
            DIAMOND_WIDTH,
            DIAMOND_HEIGHT,
        )

        if(this.alpha !== 255){
            canvas.ctx.globalAlpha = 1;
        }

    }
}