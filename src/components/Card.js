export class Card {
    constructor(data, cardSelector, funcOpenPicture) {
      this._cardSelector = cardSelector;
      this._funcOpenPicture = funcOpenPicture;
      this._name = data.name;
      this._link = data.link;
      this._toggleLike = this._toggleLike.bind(this);
      this._removeElement = this._removeElement.bind(this);
      this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card');
 }

    getElement() {
      this._element = this._cardTemplate.cloneNode(true);

      this._elementImage = this._element.querySelector('.card__image');
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;

      this._likeButton = this._element.querySelector('.card__button-like');
      this._removeButton = this._element.querySelector('.card__button-delete');
      

      this._element.querySelector('.card__title').textContent = this._name;
      this._setEventListeners();

      return this._element;
    }

    _toggleLike() {
        this._likeButton.classList.toggle('card__button-like_active');
    }
    _removeElement() {
        this._element.remove();
        this._destroyEventListener()
    }

    _setEventListeners() {
      this._likeButton.addEventListener('click', this._toggleLike.bind(this));
      this._removeButton.addEventListener('click', this._removeElement.bind(this));
  
      this._elementImage.addEventListener('click', () => {
        this._funcOpenPicture(this._name, this._link);
      });
    }
  

    _destroyEventListener() {
        this._likeButton.removeEventListener('click', this._toggleLike);
        this._removeButton.removeEventListener('click', this._removeElement);
    }
  }
  