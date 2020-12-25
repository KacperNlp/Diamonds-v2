class Media{

    #diamondSprite = null;

    get diamondSprite(){
        return this.#diamondSprite;
    }

    set diamondSprite(imageObject){
        if(!(imageObject instanceof Image)) return null;
        this.#diamondSprite = imageObject;
    }
}

export const media = new Media();