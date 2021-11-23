import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator, validationConfig } from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupCloses = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupOpenImage = document.querySelector('.popup_type_image');


const formElement = document.querySelector('.popup__form_type_edit');
const cardElement = document.querySelector('.popup__form_type_add');

const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_job');

const placeInput = document.querySelector('.popup__item_type_place');
const imageInput = document.querySelector('.popup__item_type_image');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const imageTitle = document.querySelector('.popup__image-title');
const imageView = document.querySelector('.popup__image');

const cardList = document.querySelector('.cards__container');

const profileValidator = new FormValidator(validationConfig, formElement);
profileValidator.enableValidation();
const addCardValidator = new FormValidator(validationConfig, cardElement);
addCardValidator.enableValidation();

// initialCards.forEach((data) => {
//   cardList.append(createCard(data));
// });

function createCard(name, link) {
  const card = new Card ({name, link}, '.default-card', openPicture);    
  return card.getElement();
}

function addCardItem() {
  const addCard = initialCards.map(item =>createCard(item.name, item.link));
  cardList.append(...addCard);
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapePopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapePopup);
}

function escapePopup(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

function openPicture(name, link) {
  imageTitle.textContent = name;
  imageView.src = link;
  imageView.alt = name;
  openPopup(popupOpenImage);
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  profileValidator.checkValidityForm();
  openPopup(popupEditProfile);

}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const newCardName = placeInput.value;
  const newCardLink = imageInput.value;
  cardList.prepend(createCard(newCardName, newCardLink));
  closePopup(popupAddCard);
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', () => {
  cardElement.reset()
  openPopup(popupAddCard)
});

closeButtons.forEach(function (item) {
  item.addEventListener('click', event => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

popupCloses.forEach(function (item) {
  item.addEventListener('click', event => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

formElement.addEventListener('submit', profileFormSubmit);
cardElement.addEventListener('submit', cardFormSubmit);


addCardItem();