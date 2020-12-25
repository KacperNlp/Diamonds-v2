import {DIAMOND_WIDTH, DIAMOND_HEIGHT} from '../scripts/Diamond.esm.js'

const NUMBER_OF_ROWS = 10;
const NUMBER_OF_COLUMNS = 8;
const KINDS_OF_DIAMONDS = 6;
const EMPTY_BLOCK = 99;

export const gameLevels = [
    {
        level: 1,
        unlocked: true,
        pointsToPassLevel: 5000,
        playerMovement: 30,
        mapArrangement: () => {
            const arrayWithDiamonds = [];
            const numberOfCells = NUMBER_OF_COLUMNS * NUMBER_OF_ROWS;
            let numberOfRow = 0;

            //generate random map with diamonds
            for(let cell = 0; cell < numberOfCells; cell++){
                const diamond = {};

                if(cell % NUMBER_OF_COLUMNS){
                    diamond.posX = cell * DIAMOND_WIDTH;
                    diamond.posY = numberOfRow * DIAMOND_HEIGHT;
                    diamond.row = numberOfRow;
                    diamond.column = cell % NUMBER_OF_COLUMNS;
                }else{
                    numberOfRow++;
                    diamond.posX = 0;
                    diamond.posY = numberOfRow * DIAMOND_HEIGHT;
                    diamond.row = numberOfRow;
                    diamond.column = cell % NUMBER_OF_COLUMNS;
                }

                if(cell < NUMBER_OF_COLUMNS){
                    diamond.kind = EMPTY_BLOCK;
                }else{
                    diamond.kind = Math.floor(Math.random() * KINDS_OF_DIAMONDS + 1);
                }

                arrayWithDiamonds.push(diamond)
            }

            return arrayWithDiamonds;
        }
    },{
        level: 2,
        unlocked: false,
        pointsToPassLevel: 8000,
        playerMovement: 35,
    },{
        level: 3,
        unlocked: false,
        pointsToPassLevel: 10000,
        playerMovement: 40,
    }
];