export class Popup {
    constructor(selectorPopupName) {
        this._popup = document.querySelector(selectorPopupName);
        this._buttonClose = this._popup.querySelector('.popup__close-button');
        this._closeArea = this._popup.querySelector('.popup__close.popup__area')
        this._popupStyle = 'popup_opened';
        this._handleEscClose = this._handleEscClose.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add(this._popupStyle);
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove(this._popupStyle);
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', this.close);
        this._closeArea.addEventListener('click', this.close);
    }

    get selectorPopup() {
        return this._popup;
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
}