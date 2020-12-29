import { WorkiWithHtml } from "./WorkiWithHtml.esm";
import {visbilityOfLayer, HIDDEN_LAYER, VISIBLE_LAYER} from './VisibilityOfLayer.esm.js'
import {levelsLayer} from './LevelsLayer.esm.js'
import {game} from './Game.esm.js'


const GAME_RESULT_CONTAINER_ID = 'js-result-box';
const SVG_HREF = './assets/sprite.svg#';
const SVG_ID = 'js-svg';
const CLOSE_BUTTON_ID = 'js-result-close-btn';
const TEXT_CONTAINER_ID = 'js-result-text';
const SCORE_CONTAINER_ID = 'js-result-score'

class GameResult extends WorkiWithHtml{
    constructor(){
        super(GAME_RESULT_CONTAINER_ID);

        this.typesOfSvg = {
            crown: 'crown',
            ribbon: 'ribbon',
        }

        this.typeOfTxtMessages = {
            won: 'You won!',
            lost: 'You lost!',
        }
    }

    showMessage(type, result, score,){
        this.#handleCloseButton();
        this.#messageSVG(type);
        this.#showContext(result, score)
    }

    #handleCloseButton(){
        const closeButton = this.bindToElement(CLOSE_BUTTON_ID);

        closeButton.addEventListener('click', ()=>{

            visbilityOfLayer.changeVisibilityOfLayer(this.element, HIDDEN_LAYER);
            visbilityOfLayer.changeVisibilityOfLayer(game.element, HIDDEN_LAYER);
            visbilityOfLayer.changeVisibilityOfLayer(levelsLayer.element, VISIBLE_LAYER);

        })
    }

    #messageSVG(type = this.typesOfSvg.ribbon){
        const svg = this.bindToElement(SVG_ID);
        svg.setAttribute('href', `${SVG_HREF}${type}`);
    }

    #showContext(result, score){
        const txtContainer = this.bindToElement(TEXT_CONTAINER_ID);
        const scoreContainer = this.bindToElement(SCORE_CONTAINER_ID);

        const {won, lost} = this.typeOfTxtMessages;

        txtContainer.textContent = result ?  won : lost;

        scoreContainer.textContent = score;
    }

}