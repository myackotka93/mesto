import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selectorPopupName, callBackSubmitForm) {
        super(selectorPopupName);
        this._callBackSubmitForm = callBackSubmitForm;
        this._selectorForm = this.selectorPopup.querySelector('.popup__form');
        this._formSubmitter = this._formSubmitter.bind(this);        
        this._inputList = this._selectorForm.querySelectorAll('.popup__item');
    }

    setEventListeners() {
        super.setEventListeners();
        this._selectorForm.addEventListener('submit', this._formSubmitter);
    }

    close() {
        this._selectorForm.reset();
        super.close();
    }

    _getInputValues() {
        const formValues = {};

        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });

        return formValues;
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
            if (data[input.name]) {
                input.value = data[input.name];
            }
        });
    }

    _formSubmitter(evt) {
        evt.preventDefault();
        this._callBackSubmitForm(this._getInputValues());
    }
}