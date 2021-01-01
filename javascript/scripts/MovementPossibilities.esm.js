import { EMPTY_BLOCK, NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from '../gameData/gameLevels.esm.js';
import {game} from './Game.esm.js'

class MovementPossibilities{
    checkPossibilityMovement(){
        if(game.gameState.getIsMoving()) return;

        const isPossibleToMove = game.gameState.getGameMap().some((diamond, index, diamonds) =>{

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

            //move right (diamond is in bottom of the column)
            if(
                index % NUMBER_OF_COLUMNS < NUMBER_OF_COLUMNS - 1
                && Math.floor(index / NUMBER_OF_COLUMNS) > 2
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[index - (NUMBER_OF_COLUMNS * 2) + 1].kind
            ){
                return true;
            }

            //move left in row
            if(
                index % NUMBER_OF_COLUMNS > 2
                && diamond.kind === diamonds[index - 2].kind
                && diamond.kind === diamonds[index - 3].kind
            ){
                return true;
            }

            //move left (diamond is in top of the column)
            if(
                index % NUMBER_OF_COLUMNS > 0
                && Math.floor(index / NUMBER_OF_COLUMNS) < NUMBER_OF_ROWS - 2
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[index + (NUMBER_OF_COLUMNS * 2) - 1].kind
            ){
                return true;
            }

            //move left (diamond is middle of the column)
            if(
                index % NUMBER_OF_COLUMNS > 0
                && Math.floor(index / NUMBER_OF_COLUMNS) < NUMBER_OF_ROWS - 1
                && Math.floor(index / NUMBER_OF_COLUMNS) > 1
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS + 1].kind
            ){
                return true;
            }

            //move left (diamond is in bottom of the column)
            if(
                index % NUMBER_OF_COLUMNS > 0
                && Math.floor(index / NUMBER_OF_COLUMNS) > 2
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[index - (2 * NUMBER_OF_COLUMNS) - 1].kind
            ){
                return true;
            }

            //move down (column - diamonds uder current diamond)
            if(
                Math.floor(index / NUMBER_OF_COLUMNS) < NUMBER_OF_ROWS - 3
                && diamond.kind === diamonds[index + (NUMBER_OF_COLUMNS * 2)].kind
                && diamond.kind === diamonds[index + (NUMBER_OF_COLUMNS * 3)].kind
            ){
                return true;
            }

            //move down (diamond is in the middle of the row with diamonds with the same kind)
            if(
                index % NUMBER_OF_COLUMNS > 0
                && index % NUMBER_OF_COLUMNS < NUMBER_OF_COLUMNS - 1
                && Math.floor(index / NUMBER_OF_COLUMNS) < NUMBER_OF_ROWS - 1
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS + 1].kind
            ){
                return true;
            }

            //move down (check if is in the left edge of the row)
            if(
                index % NUMBER_OF_COLUMNS < NUMBER_OF_COLUMNS - 2
                && Math.floor(index / NUMBER_OF_COLUMNS) < NUMBER_OF_ROWS - 1
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS + 2].kind
            ){
                return true;
            }

            //move down (check if is in the right edge of the row)
            if(
                index % NUMBER_OF_COLUMNS > 1
                && Math.floor(index / NUMBER_OF_COLUMNS) < NUMBER_OF_ROWS - 1
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[index + NUMBER_OF_COLUMNS - 2].kind
            ){
                return true;
            }

            //move up (diamonds on the top to the current diamond)
            if(
                Math.floor(index / NUMBER_OF_COLUMNS) > 3
                && diamond.kind === diamonds[index - (NUMBER_OF_COLUMNS * 2)].kind
                && diamond.kind === diamonds[index - (NUMBER_OF_COLUMNS * 3)].kind
            ){
                return true;
            }

            //move up (check if is in the middle of the row)
            if(
                index % NUMBER_OF_COLUMNS > 0
                && index % NUMBER_OF_COLUMNS < NUMBER_OF_COLUMNS - 1
                && Math.floor(index / NUMBER_OF_COLUMNS) > 1
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS + 1].kind
            ){
                return true;
            }

            //move up (check if is in the left edge of the row)
            if(
                index % NUMBER_OF_COLUMNS < NUMBER_OF_COLUMNS - 2
                && Math.floor(index / NUMBER_OF_COLUMNS) > 1
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS + 1].kind
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS + 2].kind
            ){
                return true;
            }

            //move up (check if is in the right edge of row)
            if(
                index % NUMBER_OF_COLUMNS > 1
                && Math.floor(index / NUMBER_OF_COLUMNS) > 1
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS - 1].kind
                && diamond.kind === diamonds[index - NUMBER_OF_COLUMNS - 2].kind
            ){
                return true;
            }

            return false;
        })

        if(!isPossibleToMove){
            game.gameState.mixDiamonds();
        }
    }
}

export const movementPossibilities = new MovementPossibilities();