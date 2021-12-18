import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor (selectorPopupName, callBackSubmitForm) {
        super(selectorPopupName);
        this._callBackSubmitForm = callBackSubmitForm;
        this._selectorForm = this.selectorPopup.querySelector('.popup__form');
        this._formSubmitter = this._formSubmitter.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._selectorForm.addEventListener('submit', this._formSubmitter); 
    }

    close() {
        this._selectorForm.reset();
        this._selectorForm.removeEventListener('submit', this._formSubmitter);
        super.close();
    }

    _getInputValues() {
        const inputList = this._selectorForm.querySelectorAll('.popup__item');
        const formValues = {};
        inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    _formSubmitter(evt) {
        evt.preventDefault();
        this._callBackSubmitForm(this._getInputValues());
    }
}