import {WorkiWithHtml, markups} from './WorkiWithHtml.esm.js';

const UNLOCKED_LEVEL_BUTTON_CLASS = 'unlocked';
const LOCKED_LEVEL_BUTTON_CLASS = 'locked';
const LEVELS_LAYER_ID = 'js-levels';

const gameLevels = [
    {
        level: 1,
        unlocked: true,
    },{
        level: 2,
        unlocked: false,
    }
]
//this class shows levels layer with all level (locked and unlocked)
class LevelsLayer extends WorkiWithHtml{
    constructor(){
        super(LEVELS_LAYER_ID)
    }

    addLevelButtonsToLevelsLayer(){

        for(let counter = 0; counter <= gameLevels; counter++){

            const button = this.createElement(markups.button);
            const {level, unlocked} = gameLevels[counter]

            this.#typeOfLevelButton(button, unlocked, level);
            this.element.appendChild(button);

        }

    }

    #typeOfLevelButton(button, isUnlocked, txt){
        button.textContent = txt;
        button.classList.add('button');
        if(isUnlocked) button.classList.add(UNLOCKED_LEVEL_BUTTON_CLASS)
        else  button.classList.add(LOCKED_LEVEL_BUTTON_CLASS)
    }
}


export const levelsLayer = new LevelsLayer();