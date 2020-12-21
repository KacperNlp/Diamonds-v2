
//variables used like props in this class 
const HIDDEN_LAYER = true;
const VISIBLE_LAYER = false; 
const CLASS_TO_HIDE_LAYER = 'hidden';

class VisbilityOfLayer{
    
    changeVisibilityOfLayer(layer, isVisible){

        if(isVisible) layer.classList.remove(CLASS_TO_HIDE_LAYER);
        else layer.classList.add(CLASS_TO_HIDE_LAYER);

    }
}