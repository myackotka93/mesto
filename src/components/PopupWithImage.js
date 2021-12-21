import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (selectorPopupName, selectorImageTitleName, selectorImageLinkName) {
        super(selectorPopupName);
        this._imageTitle = document.querySelector(selectorImageTitleName);
        this._imageLink = document.querySelector(selectorImageLinkName);
    }

    open(name, link) {
        this._imageTitle.textContent = name;
        this._imageLink.src = link;
        this._imageLink.alt = name;
        super.open();
    }

}