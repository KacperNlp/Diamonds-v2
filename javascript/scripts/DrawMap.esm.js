import {WorkiWithHtml} from './WorkiWithHtml.esm.js'
import {gameLevels} from '../gameData/gameLevels.esm.js'
import {} from './Diamond.esm.js'

const CANVAS_ID = 'js-game-map';

export class DrawMap extends WorkiWithHtml{
    constructor(){
        super(CANVAS_ID)
        this.ctx = this.getContext("2d")
    }
}
