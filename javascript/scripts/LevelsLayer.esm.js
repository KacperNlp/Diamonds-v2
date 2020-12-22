import {WorkiWithHtml, markups} from './WorkiWithHtml.esm.js';
import {gameLevels} from '../gameData/gameLevels.esm.js'

const UNLOCKED_LEVEL_BUTTON_CLASS = 'unlocked';
const LOCKED_LEVEL_BUTTON_CLASS = 'locked';
const LEVELS_LAYER_ID = 'js-levels';
const LEVEL_BUTTONS_CONTAINER_ID = 'js-levels-container';
const LEVEL_BUTTONS_CLASS = 'level-button';

//this class shows levels layer with all level (locked and unlocked)
class LevelsLayer extends WorkiWithHtml{
    constructor(){
        super(LEVELS_LAYER_ID)
        this.buttonsContainer = this.bindToElement(LEVEL_BUTTONS_CONTAINER_ID);
        this.addLevelButtonsToLevelsLayer();
    }

    addLevelButtonsToLevelsLayer(){
        this.#clearLevelButtonsContainer();
        this.#createLevelButtons();
    }

    #clearLevelButtonsContainer(){
        while(this.buttonsContainer.firstChild){
            this.buttonsContainer.removeChild(this.buttonsContainer.firstChild)
        }
    }

    #createLevelButtons(){
        for(let counter = 0; counter < gameLevels.length; counter++){

            const button = this.createElement(markups.button);
            const {level, unlocked} = gameLevels[counter]

            this.#typeOfLevelButton(button, unlocked, level);

            this.buttonsContainer.appendChild(button)
        }
    }

    #typeOfLevelButton(button, isUnlocked, txt){
        button.textContent = txt;
        button.classList.add(LEVEL_BUTTONS_CLASS);
        if(isUnlocked) button.classList.add(UNLOCKED_LEVEL_BUTTON_CLASS)
        else  button.classList.add(LOCKED_LEVEL_BUTTON_CLASS)
    }
}


export const levelsLayer = new LevelsLayer();