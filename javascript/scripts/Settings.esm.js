import {loader} from './Loader.esm.js'
import {media} from './Media.esm.js';

const SWAP_SOUND_SRC = '/assets/audio/mixkit-bubbly-achievement-tone-3193.wav';
const BACKGROUND_MUSIC_SRC = '/assets/audio/Calvin Harris - josh pan (music 1).mp3';

class Settings{
    constructor(){
        this.#setMusicAndSwapSound();
    }

    #setMusicAndSwapSound(){
        media.backgroundMusic = loader.loadSound(BACKGROUND_MUSIC_SRC);
        media.swapSound = loader.loadSound(SWAP_SOUND_SRC);
    }
}

export const settings = new Settings();