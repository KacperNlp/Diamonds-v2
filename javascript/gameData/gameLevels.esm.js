const NUMBER_OF_ROWS = 10;
const NUMBER_OF_COLUMNS = 8;
const KINDS_OF_DIAMONDS = 6;

export const gameLevels = [
    {
        level: 1,
        unlocked: true,
        pointsToPassLevel: 5000,
        playerMovement: 30,
        mapArrangement: () => {
            const diamondsArray = [];

            for(let row = 0; row <= NUMBER_OF_ROWS; row++){
                const rowArray = [];
                const columnArray = [];
                for(let column = 0; column<= NUMBER_OF_COLUMNS; column++){
                    let kind;
                    if(row === 0){
                        kind = false;
                    }else{
                        kind = Math.floor(Math.random() * KINDS_OF_DIAMONDS);
                    }

                    const diamond = {
                        row: row,
                        column: column,
                        kind: kind,
                    }

                    columnArray.push(diamond);
                }

                rowArray.push(columnArray);
                diamondsArray.push(rowArray);
            }

            return diamondsArray;
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