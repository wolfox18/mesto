import { Popup } from "./Popup";
export class PopupWithImage extends Popup {
  constructor(data, popupsSelector) {
    super(data, popupsSelector);
    this._nameElement = this._popupElement.querySelector(data.nameSelector);
    this._imageElement = this._popupElement.querySelector(data.imageSelector);
  }
  open({ name, imageUrl }) {
    this._nameElement.textContent = name;
    this._imageElement.alt = name;
    this._imageElement.src = imageUrl;
    super.open();
  }
}
