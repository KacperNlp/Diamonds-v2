import {WorkiWithHtml} from './WorkiWithHtml.esm.js';
import {GameState} from './GameState.esm.js'
import {gameLevels} from '../gameData/gameLevels.esm.js'
import {canvas} from './Canvas.esm.js'
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

        this.gameState = new GameState(pointsToPassLevel, 5000, playerMovement, mapArrangement(), media.diamondSprite)

        this.#gamePanelAnimation();
    }

    #gamePanelAnimation(){
        this.#drawDiamonds();
        this.#updateGameStats();
        window.requestAnimationFrame(()=> this.#gamePanelAnimation())
    }

    #drawDiamonds(){
        this.gameState.getGameMap().forEach(diamond => {
            diamond.drawDiamond(this.gameState.getDiamondsSprite());
        })
    }

    #updateGameStats(){
        const requiredPointsContainer = this.bindToElement(GAME_STATS_CONTAINERS_ID.requiredPoints);
        const userPointsContainer = this.bindToElement(GAME_STATS_CONTAINERS_ID.userPoints);
        const hightScoreContainer = this.bindToElement(GAME_STATS_CONTAINERS_ID.hightScore)
        const movementContainer = this.bindToElement(GAME_STATS_CONTAINERS_ID.movement);

        requiredPointsContainer.textContent = this.gameState.showRequiredScore();
        userPointsContainer.textContent = this.gameState.currentScore;
        hightScoreContainer.textContent = this.gameState.showHightScore();
        movementContainer.textContent = this.gameState.userMovement;
    }
}


export const game = new Game();