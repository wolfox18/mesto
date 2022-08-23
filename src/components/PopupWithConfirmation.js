import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(data, popupSelector) {
    super(data, popupSelector);
    this._formElement = this._popupElement.querySelector(data.formSelector);
  }
  _setSubmitListener = (evt) => {
    evt.preventDefault();
    this._handleSubmit();
    this.close();
  };
  open(handleSubmit) {
    super.open();
    this._handleSubmit = handleSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._setSubmitListener);
  }
}
