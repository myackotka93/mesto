const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inputInvalidClass: 'popup__item_type_error',
    buttonInvalidClass: 'button_disabled',
};

function showError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(validationConfig.inputInvalidClass);
}

function hideError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(validationConfig.inputInvalidClass);
}

function checkInputValidation(form, input) {
    if (!input.validity.valid) {
        showError(form, input);
    } else {
        hideError(form, input);
    }
}

function setButtonState(button, isActive) {
    if (isActive) {
        button.classList.remove(validationConfig.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(validationConfig.buttonInvalidClass);
        button.disabled = true;
    }
}

function setEventListeners(form) {
    const inputsList = form.querySelectorAll(validationConfig.inputSelector);
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);

    inputsList.forEach((input) => {
        input.addEventListener('input', (e) => {
            checkInputValidation(form, input);
            setButtonState(submitButton, form.checkValidity());
        });
    });
}

function checkValidityForm(form) {
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
    const isActive = form.checkValidity();

    setButtonState(submitButton, isActive)
}
function enableValidation(config) { 
    const forms = document.querySelectorAll(config.formSelector); 
    forms.forEach((form) => { 
        setEventListeners(form, config);
        form.addEventListener('submit', (evt) => { 
            evt.preventDefault(); 
        }); 
        checkValidityForm(form, config); 
    }); 
} 
enableValidation(validationConfig);