import {DiamondSprite} from './DiamondSprite.esm.js'

export const DIAMOND_WIDTH = 46;
export const DIAMOND_HEIGHT = 48;
export class Diamond extends DiamondSprite{
    constructor(posX, posY, row, column, kind, imageSprite){
        this.alpha = 255;
        super(posX, posY, row, column, imageSprite, this.alpha);
        this.kind = kind;
    }
}