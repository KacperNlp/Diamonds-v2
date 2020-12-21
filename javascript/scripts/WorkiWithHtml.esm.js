export class WorkiWithHtml{
    constructor(mainElement){
        this.element = this.bindToElement(mainElement);
    }

    bindToElement(id){
        return document.getElementById(id);
    }

    createElement(type){
        return document.createElement(type);
    }
}
export const markups = {
    button: 'button',
    div: 'div',
}