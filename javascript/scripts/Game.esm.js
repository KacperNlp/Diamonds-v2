import {WorkiWithHtml} from './WorkiWithHtml.esm.js';
import {GameState} from './GameState.esm.js'
import {gameLevels, EMPTY_BLOCK} from '../gameData/gameLevels.esm.js'
import {canvas, GAME_BOARD_OFFSET_Y, GAME_BOARD_OFFSET_X} from './Canvas.esm.js'
import { media } from './Media.esm.js';
import {mouseController} from './MouseController.esm.js'
import { DIAMOND_HEIGHT, DIAMOND_WIDTH } from './Diamond.esm.js';
import {NUMBER_OF_COLUMNS, NUMBER_OF_ROWS} from '../gameData/gameLevels.esm.js'
import {gameResult} from './GameResult.esm.js'
import { HIDDEN_LAYER, visbilityOfLayer, VISIBLE_LAYER } from './VisibilityOfLayer.esm.js';
import { userData } from './UserData.esm.js';
import { movementPossibilities } from './MovementPossibilities.esm.js'
import { levelsLayer } from './LevelsLayer.esm.js';

const GAME_MAP_CONTAINER_ID = 'js-game-level-container';
const GAME_STATS_CONTAINERS_ID = {
    requiredPoints: 'js-required-points',
    userPoints: 'js-user-points',
    hightScore: 'js-hight-score',
    movement: 'js-user-movement'
}

const LAST_DIAMONDS_ARRAY_INDEX = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS - 1;
const SWAPING_SPEED = 8;
const TRANSPARENCY_SPEED = 25;
const RETURN_TO_LEVELS_LAYER_BUTTON_ID = 'js-return-to-levels-layer';


class Game extends WorkiWithHtml{
    constructor(){
        super(GAME_MAP_CONTAINER_ID);
        this.diamondsMap;
    }

    newGame(level = 1){

        const lvlIndex = level - 1;

        const {pointsToPassLevel, playerMovement, mapArrangement, numberOfKinds} = gameLevels[lvlIndex];
        const hightScore = userData.getHighestScore(level)

        this.gameState = new GameState(pointsToPassLevel, hightScore, playerMovement, mapArrangement(numberOfKinds), media.diamondSprite, level, numberOfKinds)

        media.isInLevel = true;

        this.#returnButton();
        this.#gamePanelAnimation();
    }

    //return to levels layer 
    #returnButton(){
        this.button = this.bindToElement(RETURN_TO_LEVELS_LAYER_BUTTON_ID);

        this.button.addEventListener('click', this.#returnToLevelsLayer)
    }

    #returnToLevelsLayer = (e)=>{

        media.isInLevel = false;
        this.button.removeEventListener(e.type, this.#returnToLevelsLayer)

        visbilityOfLayer.changeVisibilityOfLayer(this.element, HIDDEN_LAYER);
        visbilityOfLayer.changeVisibilityOfLayer(levelsLayer.element, VISIBLE_LAYER);
        levelsLayer.initLevelsLayer();
    }
    

    #gamePanelAnimation(){
        if(media.isInLevel){
            movementPossibilities.checkPossibilityMovement();
            this.#handleMouseState();
            this.#handleMouseClick();
            this.#findMatches();
            this.#moveDiamonds();
            this.#hideDiamonds();
            this.#countScore();
            this.#revertSwap();
            this.#clearMatched();
            this.#updateGameStats();
            canvas.drawCanvasBackground();
            this.#drawDiamonds();
            this.#checksEndGame()
        }
    }

    #drawDiamonds(){
        this.gameState.getGameMap().forEach(diamond => {
            diamond.drawDiamond(this.gameState.getDiamondsSprite());
        })
    }

    //increase number of state
    #handleMouseState(){
        const isSwaping = !this.gameState.getIsSwaping();
        const isMoving = !this.gameState.getIsMoving();

        if(mouseController.clicked && isSwaping && isMoving){
            mouseController.state++;
            return;
        }
    }

    //handle the click event on diamond
    #handleMouseClick(){
        if(!mouseController.clicked) return;

        const diamondColumn = Math.floor((mouseController.posX - GAME_BOARD_OFFSET_X)/ DIAMOND_WIDTH);
        const diamondRow = Math.floor((mouseController.posY - GAME_BOARD_OFFSET_Y)/ DIAMOND_HEIGHT);


        if(!diamondRow || diamondRow >= NUMBER_OF_ROWS || diamondColumn >= NUMBER_OF_COLUMNS){
            mouseController.state = 0;
            mouseController.clicked = false;
            return;
        }

        if(mouseController.state === 1){
            mouseController.firstState = {
                posX: diamondColumn,
                posY: diamondRow,
            }
        }else if(mouseController.state === 2){
            mouseController.secendState = {
                posX: diamondColumn,
                posY: diamondRow,
            }

            mouseController.state = 0;

            if(Math.abs(mouseController.firstState.posX - mouseController.secendState.posX) + Math.abs(mouseController.firstState.posY - mouseController.secendState.posY) !== 1){
                mouseController.clicked = false;
                return;
            }


            this.#swapDiamonds();

            this.gameState.setIsSwaping(true);
            this.gameState.decreaseMovement();
        }

        mouseController.clicked = false;
    }

    //matches diamonds with the same kind
    #findMatches(){
        this.gameState.getGameMap().forEach((diamond, index, diamonds) =>{
            if(diamond.kind === EMPTY_BLOCK || index === LAST_DIAMONDS_ARRAY_INDEX) return;
            //match in a row
            if(diamond.kind === diamonds[index - 1].kind && diamond.kind === diamonds[index + 1].kind){
                //checks to see if they are in the same row
                if(Math.floor((index - 1) / NUMBER_OF_COLUMNS) === Math.floor((index + 1) / NUMBER_OF_COLUMNS)){
                    for(let i = -1; i <= 1; i++){
                        diamonds[index + i].match++;
                    }
                }
            }

            //match in a column
            const firstIndexOnTheSameColumn = index - NUMBER_OF_COLUMNS;
            const secondIndexOnTheSameColumn = index + NUMBER_OF_COLUMNS;
            if(
                index <= LAST_DIAMONDS_ARRAY_INDEX - NUMBER_OF_COLUMNS
                && index >= NUMBER_OF_COLUMNS
                && diamonds[firstIndexOnTheSameColumn].kind === diamond.kind
                && diamonds[secondIndexOnTheSameColumn].kind === diamond.kind
            ){
               //checks to see if they are in the same column
               if((index + NUMBER_OF_COLUMNS) % NUMBER_OF_COLUMNS === (secondIndexOnTheSameColumn) % NUMBER_OF_COLUMNS){
                   for(let i = firstIndexOnTheSameColumn; i <= secondIndexOnTheSameColumn;   i+=NUMBER_OF_COLUMNS){
                       diamonds[i].match++;
                   }
               }
            }
        })
    }

    //diamonds move animation
    #moveDiamonds(){
        this.gameState.setIsMoving(false);

        this.gameState.getGameMap().forEach(diamond =>{
            let differenceInRow;
            let differenceInColumn;

            //how many fps it will take to move the diamond (in this situation it will be 6 of 60fps, 8px per 1/60, since diamond width is equal to 48px)
            for(let swapSpeed = 0; swapSpeed < SWAPING_SPEED; swapSpeed++){
                differenceInRow = diamond.posX - diamond.column * DIAMOND_WIDTH;
                differenceInColumn = diamond.posY - diamond.row * DIAMOND_HEIGHT;

               if(differenceInRow){
                    diamond.posX -= differenceInRow/Math.abs(differenceInRow);
                }

                if(differenceInColumn){
                    diamond.posY -= differenceInColumn/Math.abs(differenceInColumn);
                }
            }

            if(differenceInColumn || differenceInRow){
               this.gameState.setIsMoving(true);
            }
        })
    }

    #hideDiamonds(){
        if(this.gameState.getIsMoving()) return;

        this.gameState.getGameMap().forEach(diamond =>{
            if(diamond.match && diamond.alpha >= TRANSPARENCY_SPEED){
                diamond.alpha -= TRANSPARENCY_SPEED;
                if(diamond.alpha <= TRANSPARENCY_SPEED){
                    media.playSwapSound();
                }
                this.gameState.setIsMoving(true);
            }
        })
    }

    //increase user score
    #countScore(){
        this.score = 0;

        this.gameState.getGameMap().forEach(diamond => this.score += diamond.match);

        if(!!this.score & !this.gameState.getIsMoving()){
            this.gameState.increaseCurrentScore(this.score);
        }
    }

    //when diamonds aren't matched
    #revertSwap(){
        if(this.gameState.getIsSwaping() && !this.gameState.getIsMoving()){

            if(!this.score){
                this.#swapDiamonds();
                this.gameState.increaseMovement();
            }

            this.gameState.setIsSwaping(false);
        }
    }

    //this function clear matched and generates new diamonds to change disappeared
    #clearMatched(){

        if(this.gameState.getIsMoving()) return;

        this.gameState.getGameMap().forEach((diamond, index, diamonds) =>{

            const id = LAST_DIAMONDS_ARRAY_INDEX - index //index of opposite diamond in array
            const column = Math.floor(id / NUMBER_OF_COLUMNS);//column where is our opposite diamond
            const row = Math.floor(id % NUMBER_OF_COLUMNS);//row where is our opposite diamond

            if(diamonds[id].match){

                for(let i = column; i >= 0; i--){
                    if(!diamonds[i * NUMBER_OF_COLUMNS + row].match){
                        this.#swap(diamonds[i * NUMBER_OF_COLUMNS + row], diamonds[id]);
                        break;
                    }
                }
            }
        });

        this.gameState.getGameMap().forEach((diamond, index) =>{
            const row = Math.floor(index % NUMBER_OF_COLUMNS) * DIAMOND_WIDTH;

            if(index < NUMBER_OF_COLUMNS){
                diamond.kind = EMPTY_BLOCK;
                diamond.match = 0;
            }else if(diamond.kind === EMPTY_BLOCK || diamond.match){
                diamond.posY = 0;
                diamond.posX = row;
                diamond.match = 0;
                diamond.alpha = 255;
                diamond.kind = Math.floor(Math.random() * this.gameState.getKindsOfDiamonds());
            }
        })
    }


    //game board with user movement, hight score on current map, user score and required score to unlocke next level
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

    //checks it's end of game
    #checksEndGame(){

        if(!this.gameState.getMovement() && !this.gameState.getIsMoving() && !this.gameState.getIsSwaping()){

            media.isInLevel = false;

            const playerIsWon =  this.gameState.isPlayerWinner();
            const userScore = this.gameState.currentScore;
            const hightScore = this.gameState.showHightScore();
            const level = this.gameState.getLevel();

            //show message layer 
            visbilityOfLayer.changeVisibilityOfLayer(gameResult.element, VISIBLE_LAYER);

            const {ribbon, poop, crown} = gameResult.typesOfSvg;

            if(playerIsWon){

                userData.unlockNewLevel(level)

                if(hightScore < userScore){

                    gameResult.showMessage(crown, playerIsWon, userScore);
                    userData.setNewHightScore(level, userScore);

                }else{

                    gameResult.showMessage(ribbon, playerIsWon, userScore);

                }

            }else{

                if(hightScore < userScore){

                    gameResult.showMessage(crown, playerIsWon, userScore);
                    userData.setNewHightScore(level, userScore);

                }else{

                    gameResult.showMessage(poop, playerIsWon, userScore);

                }
            }
        }else{
            this.animationFrame = window.requestAnimationFrame(()=> this.#gamePanelAnimation())
        }
    }

    //get clicked diamonds and swap them
    #swapDiamonds(){
        const firstDiamondIndex = mouseController.firstState.posY * NUMBER_OF_COLUMNS + mouseController.firstState.posX;
        const secondDiamondIndex = mouseController.secendState.posY * NUMBER_OF_COLUMNS + mouseController.secendState.posX;
        
        const firstDiamond = this.gameState.getGameMap()[firstDiamondIndex];
        const secondDiamond = this.gameState.getGameMap()[secondDiamondIndex];

        this.#swap(firstDiamond, secondDiamond);
    }

    #swap(first, second){
        [
            first.posX,
            first.posY,
            first.kind,
            first.alpha,
            first.match,
            second.posX,
            second.posY,
            second.kind,
            second.alpha,
            second.match,
        ] = [
            second.posX,
            second.posY,
            second.kind,
            second.alpha,
            second.match,
            first.posX,
            first.posY,
            first.kind,
            first.alpha,
            first.match,
        ]
        this.gameState.setIsMoving(true);
    }
}


export const game = new Game();