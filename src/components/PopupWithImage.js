import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (selectorPopupName, selectorImageTitleName, selectorImageLinkName) {
        super(selectorPopupName);
        this._selectorImageTitle = document.querySelector(selectorImageTitleName);
        this._selectorImageLink = document.querySelector(selectorImageLinkName);
    }

    open(name, link) {
        this._selectorImageTitle.textContent = name;
        this._selectorImageLink.src = link;
        this._selectorImageLink.alt = name;
        super.open();
    }

}