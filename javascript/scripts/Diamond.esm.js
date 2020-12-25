import {DiamondSprite} from './DiamondSprite.esm.js'


export const DIAMONDS_SPRITE = '/assets/diamonds.png'
export const DIAMOND_WIDTH = 46;
export const DIAMOND_HEIGHT = 48;

export class Diamond extends DiamondSprite{
    constructor(posX, posY, row, column, numberOfKind){
        this.alpha = 255;
        super(posX, posY, row, column, this.alpha);
        this.numberOfKind = numberOfKind;

        this.drawDiamond(this.numberOfKind);
    }
}