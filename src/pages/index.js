import "./index.css";

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig } from '../utils/constans.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: 'ed4e709f-de7c-46ba-abac-34b77cb68884',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cards.forEach(item => {
      cardList.addItem(addNewCard(item));
    })
  })
  .catch((err) => console.log(err));
 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');

const profileForm = document.querySelector('.popup__form_type_edit');
const cardElement = document.querySelector('.popup__form_type_add');
const avatarElement = document.querySelector('.popup__form_type_avatar');

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, cardElement);
addCardValidator.enableValidation();

const avatarCardValidator = new FormValidator(validationConfig, avatarElement);
avatarCardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image', '.popup__image-title', '.popup__image');
popupImage.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');


const addNewCard = (data) => {
  const card = new Card({
    data,
    handleInit: (card) => {
      if (card.isTurnLike(userInfo.id)) {
        card.toggleLike(true);
      }

      if (!card.isOwner(userInfo.id)) {
        card.removeButtonDelete();
      }
    },
    handleCardClick: (name, link) => {

      popupImage.open(name, link);
    },
    handleLikeClick: (card) => {

      if (card.isTurnLike(userInfo.id)) {
        api.takeLike(card._id)
          .then((data) => {
            card.setLikes(data.likes);
            card.toggleLike(false);
          })
          .catch((err) => { console.log(err) });
      } else {
        api.putLike(card._id)
          .then((data) => {
            card.setLikes(data.likes);
            card.toggleLike(true);
          })
          .catch((err) => { console.log(err) });
      }
    },
    handleDeleteIconClick: (card) => {
         
      popupDeleteForm.open({ card });
    }
  }, '.default-card');

  card.init();
  return card.getElement();
}

const cardList = new Section('.cards__container');

const popupCardForm = new PopupWithForm('.popup_type_add', (item) => {
  popupCardForm.renderLoading(true);
  api.createCard(item.name, item.link)
    .then((data) => {
      cardList.preAddItem(addNewCard(data));
      popupCardForm.close();
    })
    .catch((err) => { console.log(err) })
    .finally(() => {
      popupCardForm.renderLoading(false);
    });
});

popupCardForm.setEventListeners();

addButton.addEventListener('click', () => {
  popupCardForm.open();
  addCardValidator.checkValidityForm();
})

const popupEditForm = new PopupWithForm('.popup_type_edit', (item) => {
  popupAvatarForm.renderLoading(true);
  api.saveProfile(item.name, item.prof)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditForm.close();
    })
    .catch((err) => { console.log(err) })
    .finally(() => {
      popupEditForm.renderLoading(false);
    });
})
popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
  popupEditForm.open();
  popupEditForm.setInputValues(userInfo.getUserInfo());
  profileValidator.checkValidityForm();
})

const popupAvatarForm = new PopupWithForm('.popup_type_avatar', (item) => {
  popupAvatarForm.renderLoading(true);
  api.saveProfileAvatar(item.avatar)
    .then(() => {
     userInfo.updateAvatar(item.avatar)
     popupAvatarForm.close();
    })
    .catch((err) => { console.log(err) })
    .finally(() => {
      popupAvatarForm.renderLoading(false);
    });
});
popupAvatarForm.setEventListeners();

avatarButton.addEventListener('click', () => {
  popupAvatarForm.open();
  avatarCardValidator.checkValidityForm()
});

const popupDeleteForm = new PopupWithSubmit('.popup_type_delete', (props) => {
  const { card } = props;

  popupDeleteForm.renderLoading(true);
  api.deleteCard(card._id)
    .then(() => {card.removeElement()
      popupDeleteForm.close();
    })
    .catch((err) => { console.log(err) })
    .finally(() => {
      popupDeleteForm.renderLoading(false);
    });
});

popupDeleteForm.setEventListeners();