
const CLASS_TO_HIDE_LAYER = 'hidden';

class VisbilityOfLayer{

    changeVisibilityOfLayer(layer, isVisible){

        if(isVisible) layer.classList.remove(CLASS_TO_HIDE_LAYER);
        else layer.classList.add(CLASS_TO_HIDE_LAYER);

    }
}

export const HIDDEN_LAYER = false;
export const VISIBLE_LAYER = true; 
export const visbilityOfLayer = new VisbilityOfLayer();