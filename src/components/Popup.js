export class Popup {
    constructor (selectorPopupName) {
        this._selectorPopup = document.querySelector(selectorPopupName);
        this._selectorButtonClose = this._selectorPopup.querySelector('.popup__close-button');
        this._selectorCloseArea = this._selectorPopup.querySelector('.popup__close.popup__area')
        this._popupStyle = 'popup_opened';
        this._handleEscClose = this._handleEscClose.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._selectorPopup.classList.add(this._popupStyle);
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._selectorPopup.classList.remove(this._popupStyle);        
    }

    setEventListeners() {
        this._selectorButtonClose.addEventListener('click', this.close);
        this._selectorCloseArea.addEventListener('click', this.close);
    }

    get selectorPopup() {
        return this._selectorPopup;
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
}