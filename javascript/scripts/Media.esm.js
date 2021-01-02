class Media{

    constructor(){
        this.isInLevel = false;
        this.musicVolume = .3;
        this.swapVolume = .3;
        this.allowedMusic = true;
        this.allowedSwapSound = true;
    }

    #diamondSprite = null;
    #swapSound = null;
    #backgroundMusic = null;

    //music
    increaseMusicVolume(){
        this.musicVolume += .1;

        if(this.musicVolume > 1) this.musicVolume = 1;

        if(this.#backgroundMusic) this.#backgroundMusic.volume = this.musicVolume;
    }

    decreaseMusicVolume(){
        this.musicVolume -= .1;

        if(this.musicVolume < 0) this.musicVolume = 0;

        if(this.#backgroundMusic) this.#backgroundMusic.volume = this.musicVolume;
    }

    playBackgroundMusic(){
        if(!this.allowedMusic) return;

        this.#backgroundMusic.loop = true;
        if(this.#backgroundMusic) this.#backgroundMusic.play();
    }

    stopBackgroundMusic(){
        if(this.#backgroundMusic) this.#backgroundMusic.pause();
    }

    //swap sound
    increaseSwapSound(){
        this.swapVolume += .1;

        if(this.swapVolume > 1) this.swapVolume = 1;

        if(this.#swapSound)  this.#swapSound.volume = this.swapVolume;
    }

    decreaseSwapSound(){
        this.swapVolume -= .1;

        if(this.swapVolume < 0) this.swapVolume = 0;

        if(this.#swapSound) this.#swapSound.volume = this.swapVolume;
    }

    playSwapSound(){
        if(!this.allowedSwapSound) return;

        if(this.#swapSound) this.#swapSound.play();
    }

    //get and set swap sound and background music
    set swapSound(sound){
        this.#swapSound = sound;
        this.#swapSound.volume = this.swapVolume;
    }

    get swapSound(){
        return !!this.#swapSound;
    }

    set backgroundMusic(music){
        this.#backgroundMusic = music;
        this.#backgroundMusic.volume = this.musicVolume;
    }

    get backgroundMusic(){
        return !!this.#backgroundMusic;
    }

    toggleMusicOnOff(){
        if(this.allowedMusic){
            this.allowedMusic = false;
            this.stopBackgroundMusic();
        }else{
            this.allowedMusic = true;
            this.playBackgroundMusic();
        }
    }

    get diamondSprite(){
        return this.#diamondSprite;
    }

    set diamondSprite(imageObject){
        if(!(imageObject instanceof Image)) return null;
        this.#diamondSprite = imageObject;
    }
}

export const media = new Media();