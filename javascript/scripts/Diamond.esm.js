import {DiamondSprite} from './DiamondSprite.esm.js'


export const DIAMONDS_SPRITE = '/assets/diamonds.png'
export const DIAMOND_WIDTH = 48;
export const DIAMOND_HEIGHT = 46;

export class Diamond extends DiamondSprite{
    constructor(posX, posY, row, column, numberOfKind){
        super(posX, posY, row, column, 255);
        this.alpha = 255;
        this.posX = posX,
        this.posY = posY;
        this.row = row;
        this.column = column;
        this.numberOfKind = numberOfKind;
        this.match = 0;
    }
}