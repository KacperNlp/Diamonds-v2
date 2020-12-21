export class BindElementsFromHtml{
    constructor(mainElement){
        this.element = this.bindToElement(mainElement);
    }

    bindToElement(id){
        return document.getElementById(id);
    }

}