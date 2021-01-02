import {loader} from './Loader.esm.js'
import {WorkiWithHtml} from './WorkiWithHtml.esm.js'
import {media} from './Media.esm.js';
import {HIDDEN_LAYER, visbilityOfLayer} from './VisibilityOfLayer.esm.js'

const SWAP_SOUND_SRC = '/assets/audio/mixkit-bubbly-achievement-tone-3193.wav';
const BACKGROUND_MUSIC_SRC = '/assets/audio/Calvin Harris - josh pan (music 1).mp3';

const ON_OFF_MUSIC_BUTTON_ID ='js-on-off-music';
const INCREASE_MUSIC_BUTTON_ID = 'js-increase-musice';
const DECREASE_MUSIC_BUTTON_ID = 'js-decrease-music';

const ON_OFF_SWAP_SOUND_BUTTON_ID = 'js-on-off-swap-sound';
const INCREASE_SWAP_COUND_BUTTON_ID = 'js-increase-swap-sound';
const DECREASE_SWAP_SOUND_BUTTON_ID = 'js-decrease-swap-sound';

const CLOSE_SETTIGNS_BUTTON_ID = 'js-close-settings-button';
const SETTINGS_LAYER_ID = 'js-settings';

class Settings extends WorkiWithHtml{
    constructor(){
        super(SETTINGS_LAYER_ID)
        this.#initSettinga();
    }

    #initSettinga(){
        this.#setMusicAndSwapSound();
        this.#settingsButtonsHandle();
    }

    #setMusicAndSwapSound(){
        media.backgroundMusic = loader.loadSound(BACKGROUND_MUSIC_SRC);
        media.swapSound = loader.loadSound(SWAP_SOUND_SRC);
    }

    #settingsButtonsHandle(){
        this.#handleMusicButtons();
        this.#handleSwapSoundButtons();
        this.#closeSettings();
    }

    #handleMusicButtons(){
        const onOffButton = this.bindToElement(ON_OFF_MUSIC_BUTTON_ID);
        const increaseButton = this.bindToElement(INCREASE_MUSIC_BUTTON_ID);
        const decreaseButton = this.bindToElement(DECREASE_MUSIC_BUTTON_ID);

        onOffButton.addEventListener('click', media.toggleMusicOnOff);
        increaseButton.addEventListener('click', media.increaseMusicVolume);
        decreaseButton.addEventListener('click', media.decreaseMusicVolume);
    }

    #handleSwapSoundButtons(){
        const onOffButton = this.bindToElement(ON_OFF_SWAP_SOUND_BUTTON_ID);
        const increaseButton = this.bindToElement(INCREASE_SWAP_COUND_BUTTON_ID);
        const decreaseButton = this.bindToElement(DECREASE_SWAP_SOUND_BUTTON_ID);

        onOffButton.addEventListener('click', media.toggleSwapSound);
        increaseButton.addEventListener('click', media.increaseSwapSound);
        decreaseButton.addEventListener('click', media.decreaseSwapSound);
    }

    #closeSettings(){

        const button = this.bindToElement(CLOSE_SETTIGNS_BUTTON_ID);
        button.addEventListener('click', (e)=>{
            visbilityOfLayer.changeVisibilityOfLayer(this.element, HIDDEN_LAYER)
        })
    }
}

export const settings = new Settings();