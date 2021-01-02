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

const SWAP_SOUND_BUTTON_ICON_SPAN_ID = 'js-swap-soun-icon'

class Settings extends WorkiWithHtml{
    constructor(){
        super(SETTINGS_LAYER_ID)
        this.#initSettinga();
        this.listOfSwapSoundButtonIcons = [
            {iconClass: 'fa-volume-mute',},
            {iconClass: 'fa-volume-down',},
            {iconClass: 'fa-volume-up',},
        ]
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

        console.log(media.musicVolume)
    }

    #handleSwapSoundButtons(){
        const onOffButton = this.bindToElement(ON_OFF_SWAP_SOUND_BUTTON_ID);
        const increaseButton = this.bindToElement(INCREASE_SWAP_COUND_BUTTON_ID);
        const decreaseButton = this.bindToElement(DECREASE_SWAP_SOUND_BUTTON_ID);

        onOffButton.addEventListener('click', ()=>{
            media.toggleSwapSound();
            this.#iconForOnOffButton();
        });

        increaseButton.addEventListener('click', ()=>{
            media.increaseSwapSound();
            this.#iconForOnOffButton();
        });

        decreaseButton.addEventListener('click', ()=>{
            media.decreaseSwapSound();
            this.#iconForOnOffButton();
        });
    }

    #closeSettings(){

        const button = this.bindToElement(CLOSE_SETTIGNS_BUTTON_ID);
        button.addEventListener('click', ()=>{
            visbilityOfLayer.changeVisibilityOfLayer(this.element, HIDDEN_LAYER)
        })
    }

    //choose icon for swap sound on-off button relative to the volume
    #iconForOnOffButton=()=>{
        const iconContainer = this.bindToElement(SWAP_SOUND_BUTTON_ICON_SPAN_ID);

        for(let i = 0; i < this.listOfSwapSoundButtonIcons.length; i++){

            const {iconClass} = this.listOfSwapSoundButtonIcons[i];
            iconContainer.classList.remove(iconClass);

        }
        
        if(media.swapVolume > 0 && media.swapVolume < .6){//medium volume

            const {iconClass} = this.listOfSwapSoundButtonIcons[1]
            iconContainer.classList.add(iconClass);

        }else if(media.swapVolume >= .6){ //hight volume

            const {iconClass} = this.listOfSwapSoundButtonIcons[2]
            iconContainer.classList.add(iconClass);

        }else{//mute volume

            const {iconClass} = this.listOfSwapSoundButtonIcons[0]
            iconContainer.classList.add(iconClass);

        }
    }
}

export const settings = new Settings();