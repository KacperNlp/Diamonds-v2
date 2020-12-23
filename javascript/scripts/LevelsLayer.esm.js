import {WorkiWithHtml, markups} from './WorkiWithHtml.esm.js';
import {gameLevels} from '../gameData/gameLevels.esm.js'
import {mainMenu} from '../MainMenu.esm.js'
import {visbilityOfLayer, HIDDEN_LAYER, VISIBLE_LAYER} from './VisibilityOfLayer.esm.js'

const UNLOCKED_LEVEL_BUTTON_CLASS = 'unlocked';
const LOCKED_LEVEL_BUTTON_CLASS = 'locked';
const LEVELS_LAYER_ID = 'js-levels';
const LEVEL_BUTTONS_CONTAINER_ID = 'js-levels-container';
const LEVEL_BUTTONS_CLASS = 'level-button';
const LEVEL_BUTTONS_NAME_OF_ATTRIBUTE_WITH_LEVEL = 'data-level';
const LEVEL_BUTTONS_NAME_OF_ATTRIBUTE_WITH_STATUS = 'data-unlocked';
const RETURN_TO_MENU_BUTTON_ID = 'js-return-to-menu-button';

//this class shows levels layer with all levels (locked and unlocked)
class LevelsLayer extends WorkiWithHtml{
    constructor(){
        super(LEVELS_LAYER_ID)
        this.buttonsContainer = this.bindToElement(LEVEL_BUTTONS_CONTAINER_ID);
        this.initLevelsLayer();
    }

    initLevelsLayer(){
        const returnToMenuButton = this.bindToElement(RETURN_TO_MENU_BUTTON_ID);

        returnToMenuButton.addEventListener('click', this.#handleOfReturnButton)
        this.#addLevelButtonsToLevelsLayer();
    }

    #addLevelButtonsToLevelsLayer(){
        this.#clearLevelButtonsContainer();
        this.#createLevelButtons();
    }

    #handleOfReturnButton=()=>{
        visbilityOfLayer.changeVisibilityOfLayer(this.element,HIDDEN_LAYER);
        visbilityOfLayer.changeVisibilityOfLayer(mainMenu.element, VISIBLE_LAYER);
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

    //if level is unlocked than he will has a different styles and he will receive an event listener
    #typeOfLevelButton(button, isUnlocked, level){

        button.textContent = level;
        button.setAttribute(LEVEL_BUTTONS_NAME_OF_ATTRIBUTE_WITH_LEVEL, level);
        button.setAttribute(LEVEL_BUTTONS_NAME_OF_ATTRIBUTE_WITH_STATUS, isUnlocked);
        button.classList.add(LEVEL_BUTTONS_CLASS);

        if(isUnlocked) button.classList.add(UNLOCKED_LEVEL_BUTTON_CLASS)
        else  button.classList.add(LOCKED_LEVEL_BUTTON_CLASS)
    }
}


export const levelsLayer = new LevelsLayer();