import {WorkiWithHtml} from './WorkiWithHtml.esm.js';
import {GameState} from './GameState.esm.js'
import {gameLevels} from '../gameData/gameLevels.esm.js'
import {canvas} from './Canvas.esm.js'
import { Diamond } from './Diamond.esm.js';
import { media } from './Media.esm.js';

const GAME_MAP_CONTAINER_ID = 'js-game-level-container';
const GAME_STATS_CONTAINERS_ID = {
    requiredPoints: 'js-required-points',
    userPoints: 'js-user-points',
    hightScore: 'js-hight-score',
    movement: 'js-user-movement'
}


class Game extends WorkiWithHtml{
    constructor(){
        super(GAME_MAP_CONTAINER_ID);
        this.diamondsMap;
    }

    newGame(level = 1){

        const lvlIndex = level - 1;

        const {unlocked, pointsToPassLevel, playerMovement, mapArrangement} = gameLevels[lvlIndex];

        if(!unlocked) return;

        this.diamondsMap = mapArrangement();//creates an array with diamonds

        this.gameState = new GameState(level, pointsToPassLevel, 5000, playerMovement)

        this.#gamePanelAnimation();
    }

    #gamePanelAnimation(){
        this.#drawDiamonds();
        window.requestAnimationFrame(()=> this.#gamePanelAnimation())
    }

    #drawDiamonds(){

        for(let  numberOfDiamond = 0; numberOfDiamond < this.diamondsMap.length; numberOfDiamond++){

            const {posX, posY, row, column, kind} = this.diamondsMap[numberOfDiamond]; //get diamond parameters from generated map of diamonds 

            const diamond = new Diamond(posX, posY, row, column, kind);
            
            diamond.drawDiamond(media.diamondSprite)
        }
    }
}


export const game = new Game();