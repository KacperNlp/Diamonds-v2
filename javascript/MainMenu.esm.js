import {WorkiWithHtml} from './scripts/WorkiWithHtml.esm.js';
import {levelsLayer} from './scripts/LevelsLayer.esm.js'
import {visbilityOfLayer, HIDDEN_LAYER, VISIBLE_LAYER} from './scripts/VisibilityOfLayer.esm.js'


const START_GAME_BUTTON_ID = 'js-menu-star-game-button';
const SETTIGNS_BUTTON_ID = 'js-menu-settings-button';
const MENU_LAYER_ID = 'js-menu';

class MainMenu extends WorkiWithHtml{
    constructor(){
        super(MENU_LAYER_ID);
        this.bindToElements();
    }

    bindToElements(){

        const startGameButton = this.bindToElement(START_GAME_BUTTON_ID);
        const settingsButton = this.bindToElement(SETTIGNS_BUTTON_ID);

        startGameButton.addEventListener('click', this.#startGame);
        settingsButton.addEventListener('click', this.#showSettings)
    }

    //hide main menu and show levels layer
    #startGame=()=>{
        visbilityOfLayer.changeVisibilityOfLayer(this.element, HIDDEN_LAYER);
        visbilityOfLayer.changeVisibilityOfLayer(levelsLayer.element, VISIBLE_LAYER);
    }

    #showSettings=()=>{
        console.log('ustawienia')
    }
}


export const mainMenu = new MainMenu();