import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(selectorPopupName, handleFormSubmit) {
        super(selectorPopupName);
        this._handleFormSubmit = handleFormSubmit;
        this._selectorForm = this.selectorPopup.querySelector('.popup__form');
        this._submitButton = this._selectorForm.querySelector('.popup__save-button');
        this._formSubmitter = this._formSubmitter.bind(this);
    }

    renderLoading(isLoading) {
        this._submitButton.textContent = isLoading ? 'Удаление...' : 'Да';
    }

    setEventListeners() {
        super.setEventListeners();
        this._selectorForm.addEventListener('submit', this._formSubmitter);
    }

    open(props) {
        super.open()
        this._props = props;
    } 

    _formSubmitter(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._props);
    }
}