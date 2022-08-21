import { userId } from "../utils/constants";

export class Card {
  constructor(data, selector, callbacks, userId) {
    this._imageUrl = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._selector = selector;
    this._isOwn = data.owner._id === userId;
    this._id = data._id;
    this._userId = userId;
    this._handleCardClick = callbacks.handleCardClick;
    this._handleDeleteClick = callbacks.handleDeleteClick;
    this._changeLike = callbacks.changeLikes;
  }

  _generateTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
  }
  _isLikedByUser() {
    return this._likes.some((like) => like._id === this._userId);
  }
  _addLikeListener() {
    this._isLiked = this._isLikedByUser();
    if (this._isLiked)
      this._likeButtonElement.classList.add("element__like_active");
    this._likeButtonElement.addEventListener("click", () => {
      if (this._isLiked) {
        this._likeButtonElement.classList.remove("element__like_active");
        this._likeCounter.textContent = this._changeLike(this._id, "remove");
        this._isLiked = false;
      } else {
        this._likeButtonElement.classList.add("element__like_active");
        this._likeCounter.textContent = this._changeLike(this._id, "add");
        this._isLiked = true;
      }
    });
    console.log(this._name, " - лайкнута = ", this._isLiked);
  }

  _setDeleteListener() {
    const cardDeleteButton = this._cardElement.querySelector(
      ".element__delete-button"
    );
    if (this._isOwn) {
      cardDeleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._cardElement, this._id);
      });
    } else {
      cardDeleteButton.style.display = "none";
    }
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
    this._likeCounter = this._cardElement.querySelector(
      ".element__like-counter"
    );
    this._imageElement = this._cardElement.querySelector(".element__image");
    this._imageElement.src = this._imageUrl;
    this._imageElement.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._setEventListeners();
    return this._cardElement;
  }
}
