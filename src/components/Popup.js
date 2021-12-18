export class Popup {
    constructor (selectorPopupName) {
        this._selectorPopup = document.querySelector(selectorPopupName);
        this._selectorButtonClose = this._selectorPopup.querySelector('.popup__close-button');
        this._selectorCloseArea = this._selectorPopup.querySelector('.popup__close.popup__area')
        this._popupStyle = 'popup_opened';
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleButtonClose = this._handleButtonClose.bind(this);
        this._clickOutside = this._clickOutside.bind(this);
    }

    open() {
        this._selectorPopup.classList.add(this._popupStyle);
        console.log(this._selectorButtonClose)
    }

    close() {
        this._selectorPopup.classList.remove(this._popupStyle);        
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._clickOutside);

        this._selectorButtonClose.addEventListener('click', this._handleButtonClose);
        this._selectorCloseArea.addEventListener('click', this._handleButtonClose);
    }

    get selectorPopup() {
        return this._selectorPopup;
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleButtonClose() {
        this.close();        
    }

    _clickOutside(evt) {
        if (evt.target.classList.contains(this._popupStyle)) {
            this.close();
        }
    }
}