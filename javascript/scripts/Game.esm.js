import {WorkiWithHtml} from './WorkiWithHtml.esm.js';
import {GameState} from './GameState.esm.js'
import {gameLevels} from '../gameData/gameLevels.esm.js'

const GAME_MAP_CONTAINER_ID = '';
const GAME_MAP_CANVAS_ID = '';


class Game extends WorkiWithHtml{
    constructor(){
        super();
    }

    newGame(level = 1){

        const lvlIndex = level - 1;

        const {kind, unlocked, pointsToPassLevel, playerMovement, mapArrangement} = gameLevels[lvlIndex];

        if(!unlocked) return;

        this.gameState = new GameState(level, pointsToPassLevel, 5000, playerMovement)

        this.#gamePanelAnimation();
    }

    #gamePanelAnimation(){

    }
}


export const game = new Game();