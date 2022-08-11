export class Card {
  constructor(data, selector, handleCardClick) {
    this._imageUrl = data.imageUrl;
    this._name = data.name;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _generateTemplate() {
    const newElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    return newElement;
  }

  _addLikeListener() {
    this._likeButtonElement.addEventListener("click", () => {
      this._likeButtonElement.classList.toggle("element__like_active");
    });
  }

  _setDeleteListener() {
    const cardDeleteButton = this._cardElement.querySelector(
      ".element__delete-button"
    );
    cardDeleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }
  _setPreviewListener() {
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, imageUrl: this._imageUrl });
    });
  }
  _setEventListeners() {
    this._addLikeListener();
    this._setDeleteListener();
    this._setPreviewListener();
  }

  generateCard() {
    this._cardElement = this._generateTemplate();
    this._likeButtonElement = this._cardElement.querySelector(".element__like");
    this._imageElement = this._cardElement.querySelector(".element__image");
    this._imageElement.src = this._imageUrl;
    this._imageElement.alt = "Миниаютюра «" + this._name + "»";
    this._cardElement.querySelector(".element__title").textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
