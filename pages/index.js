let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form')
let popupContainer = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__item_type_name');
let jobInput = document.querySelector('.popup__item_type_job'); 

let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');

  jobInput.value = job.textContent;
  nameInput.value = name.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');

}

function popupSubmitHandler(evt) {
  evt.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup();

}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', popupSubmitHandler);

