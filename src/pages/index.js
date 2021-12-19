import "./index.css";

import { Card } from '../components/Card.js';
import { initialCards } from '../utils/initialCards.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig } from '../utils/constans.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formElement = document.querySelector('.popup__form_type_edit');
const cardElement = document.querySelector('.popup__form_type_add');

const profileValidator = new FormValidator(validationConfig, formElement);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, cardElement);
addCardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image', '.popup__image-title', '.popup__image');
popupImage.setEventListeners();

const initialCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = addNewCard(item);
        initialCardList.addItem(cardElement);
    }
}, '.cards__container');

initialCardList.renderItems();

const popupCardForm = new PopupWithForm('.popup_type_add', (item) => {
    const cardElement = addNewCard(item);
    initialCardList.preAddItem(cardElement);
    popupCardForm.close();
});

addButton.addEventListener('click', () => {
    popupCardForm.open();
    addCardValidator.checkValidityForm();
    popupCardForm.setEventListeners();
})

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupEditForm = new PopupWithForm('.popup_type_edit', (item) => {
    userInfo.setUserInfo(item.name, item.prof);
    popupEditForm.close();
})

editButton.addEventListener('click', () => {
    popupEditForm.open();
    popupEditForm.setInputValues(userInfo.getUserInfo());
    profileValidator.checkValidityForm();
    popupEditForm.setEventListeners();
})

function addNewCard(item) {
    const card = new Card(item, '.default-card', () => popupImage.open(item.name, item.link));
    return card.getElement()
}