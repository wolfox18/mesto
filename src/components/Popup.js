export class Popup {
  constructor(data, popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._openedClass = data.openedClass;
    this._closeButton = this._popupElement.querySelector(data.closeButtonSelector);
  }
  _handleEscClose = (evt) => {
    if (evt.code === "Escape") {
      this.close();
    }
  };
  open() {
    this._popupElement.classList.add(this._openedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove(this._openedClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleCloseByClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    this._popupElement.addEventListener(
      "mousedown",
      this._handleCloseByClick.bind(this)
    );
  }
}
