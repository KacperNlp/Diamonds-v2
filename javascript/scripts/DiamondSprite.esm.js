import {canvas} from './Canvas.esm.js';
import {DIAMOND_WIDTH, DIAMOND_HEIGHT} from './Diamond.esm.js'
import {EMPTY_BLOCK} from '../gameData/gameLevels.esm.js'

const DAIMOND_RATION_TO_MAP_SIZE = 1.11;

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
            this.posX * DAIMOND_RATION_TO_MAP_SIZE, 
            this.posY * DAIMOND_RATION_TO_MAP_SIZE,
            DIAMOND_WIDTH * DAIMOND_RATION_TO_MAP_SIZE,
            DIAMOND_HEIGHT * DAIMOND_RATION_TO_MAP_SIZE,
        )

    }
}