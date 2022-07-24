export class Card {
  constructor(data, selector, openImagePreview) {
    this._imageUrl = data.imageUrl;
    this._name = data.name;
    this._selector = selector;
    this._openImagePreview = openImagePreview;
  }

  _generateTemplate() {
    const newElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    return newElement;
  }
  
  _addLikeListener() {
    const elementLikeButton = this._cardElement.querySelector('.element__like');
    elementLikeButton.addEventListener("click", () => {
      elementLikeButton.classList.toggle("element__like_active");
    });
  }
  
  _setDeleteListener() {
    const cardDeleteButton = this._cardElement.querySelector(".element__delete-button");
    cardDeleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }
  _setPreviewListener() {
    this._imageElement.addEventListener('click', () => {
      this._openImagePreview({name: this._name, imageUrl: this._imageUrl});
    });
  }

  generateCard() {
    this._cardElement = this._generateTemplate();
    this._imageElement = this._cardElement.querySelector(".element__image");
    this._imageElement.src = this._imageUrl;
    this._imageElement.alt = "Миниаютюра «" + this._name + "»";
    this._cardElement.querySelector(".element__title").textContent = this._name;
    this._addLikeListener();
    this._setDeleteListener();
    this._setPreviewListener();
    return this._cardElement;
  }
}
