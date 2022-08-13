export class Popup {
  constructor(data) {
    this._element = document.querySelector(data.popupSelector);
    this._openedClass = data.openedClass;
    this._closeButton = this._element.querySelector(data.closeButtonSelector);
  }
  _handleEscClose = (evt) => {
    if (evt.code === "Escape") {
      this.close();
    }
  };
  open() {
    this._element.classList.add(this._openedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._element.classList.remove(this._openedClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleCloseByClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    this._element.addEventListener(
      "mousedown",
      this._handleCloseByClick.bind(this)
    );
  }
}
