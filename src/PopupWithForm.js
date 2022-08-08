import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor(data) {
    this._formElement = this._element.querySelector(data.formSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(data.inputSelector)
    );
    this._handleFormSubmit = data.handleFormSubmit;
    super(data);
  }
  _getInputValues() {
    this._inputData = {};
    this._inputList.forEach((input) => {
      this._inputData[input.id] = input.value;
    });
    this._inputData;
  }
  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
  close() {
    this._formElement.reset();
    super.close();
  }
}
