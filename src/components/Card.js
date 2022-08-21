export class Card {
  constructor(data, selector, callbacks, userId) {
    this._data = data;

    this._selector = selector;

    this._handleCardClick = callbacks.handleCardClick;
    this._handleDeleteClick = callbacks.handleDeleteClick;
    this._changeLike = callbacks.changeLike;

    this._userId = userId;

    this._isOwn = data.owner._id === userId;
    this.isLiked = this._data.likes.some(
      (like) => like._id === this._userId
    );
  }

  _generateTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleLike() {
    this._changeLike(this._data, this.isLiked, (updatedLikes) => {
      this._data.likes = updatedLikes;
      if (this.isLiked) {
        this._likeButtonElement.classList.remove("element__like_active");
      } else {
        this._likeButtonElement.classList.add("element__like_active");
      }
      this.isLiked = !this.isLiked;
      this._likeCounter.textContent = this._data.likes.length;
    });
  }

  _addLikeListener() {
    this._likeButtonElement.addEventListener("click", () => {
      this._handleLike();
    });
  }

  _setDeleteListener() {
    const cardDeleteButton = this._cardElement.querySelector(
      ".element__delete-button"
    );
    if (this._isOwn) {
      cardDeleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._cardElement, this._data._id);
      });
    } else {
      cardDeleteButton.style.display = "none";
    }
  }
  _setPreviewListener() {
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick({
        name: this._data.name,
        imageUrl: this._data.link,
      });
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
    this._likeCounter = this._cardElement.querySelector(
      ".element__like-counter"
    );
    this._imageElement = this._cardElement.querySelector(".element__image");
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._cardElement.querySelector(".element__title").textContent =
      this._data.name;
    this._likeCounter.textContent = this._data.likes.length;
    if (this.isLiked) {
      this._likeButtonElement.classList.add("element__like_active");
    }
    this._setEventListeners();
    return this._cardElement;
  }
}
