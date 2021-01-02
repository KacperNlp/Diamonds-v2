import {visbilityOfLayer, HIDDEN_LAYER, VISIBLE_LAYER} from './VisibilityOfLayer.esm.js'
import { WorkiWithHtml } from './WorkiWithHtml.esm.js';

const LOADER_CONTAINER_ID = 'js-loader';
const ELEMENTS_TO_BE_LOADED_CONTAINER_ID = 'js-to-be-loaded';
const LOADED_ELEMENTS_CONTAINER_ID = 'js-loaded';

class Loader extends WorkiWithHtml{
    constructor(){
        super(LOADER_CONTAINER_ID);
        //loader flags
        this.isAllLoaded = false;
        this.counterOfAllElements = 0;
        this.currentLoadedElement = 0;

        this.#bindToElements();
    }

    #bindToElements(){
        this.containerOfElementsToBeLoaded = this.bindToElement(ELEMENTS_TO_BE_LOADED_CONTAINER_ID);
        this.containerOfLoadedElements = this.bindToElement(LOADED_ELEMENTS_CONTAINER_ID);
    }

    loadImage(imageUrl){
        visbilityOfLayer.changeVisibilityOfLayer(this.element, VISIBLE_LAYER);
        this.isAllLoaded = false;
        this.counterOfAllElements++;
        this.containerOfElementsToBeLoaded.textContent = this.counterOfAllElements;

        const image = new Image();
        image.src = imageUrl;
        image.addEventListener('load', this.#itemLoaded)

        return image;
    }

    loadSound(soundUrl){
        const audio = new Audio();
        audio.src = soundUrl;
        return audio;
    }

    #itemLoaded = (event) =>{
        event.target.removeEventListener(event.type, this.#itemLoaded)

        this.isAllLoaded = true;
        this.currentLoadedElement++;
        this.containerOfLoadedElements.textContent = this.currentLoadedElement;

        if(this.counterOfAllElements === this.currentLoadedElement){
            this.#clearFlags();
            visbilityOfLayer.changeVisibilityOfLayer(this.element, HIDDEN_LAYER);
        }
    }

    #clearFlags(){
        this.isAllLoaded = true;
        this.counterOfAllElements = 0;
        this.currentLoadedElement = 0;
    }
}

export const loader = new Loader();