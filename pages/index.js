const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupOpenImage = document.querySelector('.popup_type_image');


const formElement = document.querySelector('.popup_type_edit')
const cardElement = document.querySelector('.popup__form_type_add')

const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_job'); 

const placeInput = document.querySelector('.popup__item_type_place');
const imageInput = document.querySelector('.popup__item_type_image'); 

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const imageTitle = document.querySelector('.popup__image-title');
const imageView = document.querySelector('.popup__image');

const cardTemplate = document.querySelector('#card__template').content;
const cardList = document.querySelector('.cards__container');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Ладожские шхеры',
    link: './images/ladoga.jpg'
  },
  {
    name: 'Мыс Фиолент',
    link: './images/mysfiolent.jpg'
  },
  {
    name: 'Териберка',
    link: './images/teriberka.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function addCardItem() {
  const addCard = initialCards.map(createCard);
  cardList.append(...addCard);
}

function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = item.name;

  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  newCard.querySelector('.card__button-like').addEventListener('click', (event) => {
    event.target.classList.toggle('card__button-like_active');
  });

  newCard.querySelector('.card__button-delete').addEventListener('click', (event) => {
    event.target.closest('.card').remove();
  });
  
  cardImage.addEventListener('click', () => openPicture(item));

  return newCard;
}


function openPopup(popup) {                      
  popup.classList.add('popup_opened');
}

function closePopup(evt) {    
  const popupToClose = evt.target.closest('.popup'); 
  popupToClose.classList.remove('popup_opened');    
}

function openPicture(item) {
  imageTitle.textContent = item.name;
  imageView.src = item.link;
  imageView.alt = item.name;
  openPopup(popupOpenImage);
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const newCardName = placeInput.value;
  const newCardLink = imageInput.value;
  const newCard = createCard({ name: newCardName, link: newCardLink});
  cardList.prepend(newCard);
  closePopup(evt);
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt);
}

editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', () => {
    cardElement.reset()
    openPopup(popupAddCard)
});

closeButtons.forEach(function(item){ 
  item.addEventListener('click', closePopup); 
});

formElement.addEventListener('submit', profileFormSubmit);
cardElement.addEventListener('submit', cardFormSubmit);

addCardItem();

