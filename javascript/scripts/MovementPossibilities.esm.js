import { EMPTY_BLOCK, NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from '../gameData/gameLevels.esm.js';
import {game} from './Game.esm.js'

class MovementPossibilities{
    checkPossibilityMovement(){
        if(game.gameState.getIsMoving()) return;

        game.gameState.getGameMap().some((diamond, index, diamonds) =>{

            if(diamond.kind === EMPTY_BLOCK) return false;

            //move right in row
            if(
                index % NUMBER_OF_COLUMNS < NUMBER_OF_COLUMNS - 3
                && diamond.kind === diamonds[index + 2].kind
                && diamond.kind === diamonds[index + 3].kind
            ){
                return true;
            }

            //move right (diamond is in middle of the column)
            if(
                index % NUMBER_OF_COLUMNS < NUMBER_OF_COLUMNS - 1
                && Math.floor(index / NUMBER_OF_COLUMNS) > 1
                && Math.floor(index /NUMBER_OF_COLUMNS) < NUMBER_OF_ROWS - 1
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS + 1].kind
            ){
                return true;
            }

            //move right (dimaond is in top of the column)
            if(
                index % NUMBER_OF_COLUMNS < NUMBER_OF_COLUMNS - 1
                && Math.floor(index / NUMBER_OF_COLUMNS) < NUMBER_OF_ROWS - 2
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[index + (2 * NUMBER_OF_COLUMNS) + 1].kind
            ){
                return true;
            }
        })
    }
}

export const movementPossibilities = new MovementPossibilities();