import {DiamondSprite} from './DiamondSprite.esm.js'


export const DIAMONDS_SPRITE = '/assets/diamonds.png'
export const DIAMOND_WIDTH = 46;
export const DIAMOND_HEIGHT = 48;

export class Diamond extends DiamondSprite{
    constructor(posX, posY, row, column, numberOfKind){
        super(posX, posY, row, column, 255);
        this.alpha = 255;
        this.numberOfKind = numberOfKind;

        this.drawDiamond(this.numberOfKind);
    }
}