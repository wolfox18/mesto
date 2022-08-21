import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor(data, popupsSelector, callbacks) {
    super(data, popupsSelector);
    this._formElement = this._element.querySelector(data.formSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(data.inputSelector)
    );
    this._handleFormSubmit = callbacks.handleFormSubmit;
    this._submitButton = this._formElement.querySelector(
      data.submitButtonSelector
    );
    this._initialSubmitText = this._submitButton.textContent;
  }
  _getInputValues() {
    this._inputData = {};
    this._inputList.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }
  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), (isLoading) => {
        if (isLoading) {
          this._submitButton.textContent = "Сохранение...";
        } else {
          this._submitButton.textContent = this._initialSubmitText;
        }
      });
      this.close();
    });
    super.setEventListeners();
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  setInputValues(inputData) {
    this._inputList.forEach((input) => {
      input.value = inputData[input.name];
    });
  }
}
