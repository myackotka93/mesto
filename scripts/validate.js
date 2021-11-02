const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inputInvalidClass: 'popup__item_type_error',
    buttonInvalidClass: 'button_disabled',
};

function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputInvalidClass);
}

function checkInputValidation(form, input, config) {
    if (!input.validity.valid) {
        showError(form, input, config);
    } else {
        hideError(form, input, config);
    }
}
function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = true;
    }
}

function setEventListeners(form, config) {
    const inputsList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputsList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidation(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

function checkValidityForm(form, config) {
    const submitButton = form.querySelector(config.submitButtonSelector);
    const isActive = form.checkValidity();
    
    setButtonState(submitButton, isActive, config)
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