export class Card {
  constructor(options, cardSelector) {
    this._id = options.data._id;
    this._name = options.data.name;
    this._link = options.data.link;
    this._owner = options.data.owner;
    this._likes = options.data.likes || [];
    this._createdAt = options.data.createdAt;
    this._cardSelector = cardSelector;
    this._handleInit = options.handleInit;
    this._handleCardClick = options.handleCardClick;
    this._handleLikeClick = options.handleLikeClick;
    this._handleDeleteIconClick = options.handleDeleteIconClick;

    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card');
  }

  getElement() {
    return this._element;
  }

  init() {
    this._element = this._cardTemplate.cloneNode(true);

    this._elementImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__button-like');
    this._removeButton = this._element.querySelector('.card__button-delete');
    this._likeCount = this._element.querySelector('.card__like-count');


    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();


    this._elementImage.src = this._link;
    this._elementImage.alt = this._name + '.';

    this.setLikes(this._likes);
    this._handleInit(this);

    return this._element;
  }

  isOwner(ownerId) {
    return this._owner._id === ownerId;
  }

  isTurnLike(ownerId) {
    return this._likes.some(like => like._id === ownerId);
  }

  removeButtonDelete() {
    this._removeButton.remove();
  }

  toggleLike(toggle) {
    toggle ? this._likeButton.classList.add('card__button-like_active') : this._likeButton.classList.remove('card__button-like_active');
  }

  setLikes(likes) {
    this._likes = likes;
    this._likeCount.textContent = this._likes.length;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._removeButton.addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _destroyEventListener() {
    this._likeButton.removeEventListener('click', this._toggleLike);
    this._removeButton.removeEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });
  }
}
