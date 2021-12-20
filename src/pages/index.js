import "./index.css";

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig } from '../utils/constans.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../api/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: 'ed4e709f-de7c-46ba-abac-34b77cb68884',
    'Content-Type': 'application/json'
  }
});

api.getProfile()
  .then((data) => {
    userInfo.setUserInfo(data)
  })
  .catch((err) => { console.log(err) });

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');

const formElement = document.querySelector('.popup__form_type_edit');
const cardElement = document.querySelector('.popup__form_type_add');
const avatarElement = document.querySelector('.popup__form_type_avatar');

const profileValidator = new FormValidator(validationConfig, formElement);
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
      //...что должно произойти при клике на картинку
      popupImage.open(name, link);
    },
    handleLikeClick: (card) => {
      //...что должно произойти при клике на лайк
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
      //...что должно произойти при клике на удаление            
      popupDeleteForm.open({ card });
    }
  }, '.default-card');

  card.init();
  return card.getElement();
}

const cardList = new Section('.cards__container');

api.getInitialCards()
  .then((data) => {
    data.forEach(item => {
      cardList.addItem(addNewCard(item))
    })
  })
  .catch((err) => { console.log(err) });

const popupCardForm = new PopupWithForm('.popup_type_add', (item) => {
  popupCardForm.renderLoading(true);
  api.createCard(item.name, item.link)
    .then((data) => {
      cardList.preAddItem(addNewCard(data));
    })
    .catch((err) => { console.log(err) })
    .finally(() => {
      popupCardForm.renderLoading(false);
      popupCardForm.close();
    });
});

popupCardForm.setEventListeners();

addButton.addEventListener('click', () => {
  popupCardForm.open();
  addCardValidator.checkValidityForm();
})

// const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupEditForm = new PopupWithForm('.popup_type_edit', (item) => {
  popupAvatarForm.renderLoading(true);
  api.saveProfile(item.name, item.prof)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => { console.log(err) })
    .finally(() => {
      popupEditForm.renderLoading(false);
      popupEditForm.close();
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
    .then(() => userInfo.updateAvatar(item.avatar))
    .catch((err) => { console.log(err) })
    .finally(() => {
      popupAvatarForm.renderLoading(false);
      popupAvatarForm.close();
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
    .then(() => card.removeElement())
    .catch((err) => { console.log(err) })
    .finally(() => {
      popupDeleteForm.renderLoading(false);
      popupDeleteForm.close();
    });
});

popupDeleteForm.setEventListeners();