export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inputInvalidClass: 'popup__item_type_error',
    buttonInvalidClass: 'button_disabled',
};

export class FormValidator {
    constructor(config, form) {
      this._form = form;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inputInvalidCLass = config.inputInvalidCLass;
      this._buttonInvalidClass = config.buttonInvalidClass;
      this._button = this._form.querySelector(this._submitButtonSelector);
      this._inputList = this._form.querySelectorAll(this._inputSelector);
    }

    _showError(input) {
      const error = this._form.querySelector(`#${input.id}-error`);
      error.textContent = input.validationMessage;
      input.classList.add(this._inputInvalidCLass);
    };  

    _hideError(input) {
      const error = this._form.querySelector(`#${input.id}-error`);
      error.textContent = "";
      input.classList.remove(this._inputInvalidCLass);
    }; 

   _checkInputValidity(input) {
      if(input.validity.valid){
        this._hideError(input);
      } else {
        this._showError(input);
      }
    }; 

    _setButtonState(isActive) {
      if(isActive) {
        this._button.classList.remove(this._buttonInvalidClass);
        this._button.disabled = false;
      } else {
        this._button.classList.add(this._buttonInvalidClass);
        this._button.disabled = true;
      }
    }

    _setEventListeners() {
      this._inputList.forEach(input => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this.checkValidityForm();
        });
      })
    }

    resetValidation() {
      this._inputList.forEach((inputElement) => {
        this._hideError(inputElement)
      });
      this._setButtonState(this._form.checkValidity());
    }

    checkValidityForm() {
      this._setButtonState(this._form.checkValidity());
    }

    enableValidation() {
      this._setEventListeners();
      this.checkValidityForm();
      }
}