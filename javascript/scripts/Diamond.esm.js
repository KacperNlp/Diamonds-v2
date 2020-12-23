import {DiamondSprite} from './DiamondSprite.esm.js'

const DIAMOND_WIDTH = 46;
const DIAMOND_HEIGHT = 48;
export class Diamond extends DiamondSprite{
    constructor(posX, posY, row, column, kind, imageSprite){
        super(posX, posY, row, column, imageSprite);
        this.kind = kind;
    }
}