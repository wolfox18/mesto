import { Popup } from "./Popup";
export class PopupWithImage extends Popup {
  constructor(data) {
    super(data);
    this._nameElement = this._element.querySelector(data.nameSelector);
    this._imageElement = this._element.querySelector(data.imageSelector);
  }
  open({ name, imageUrl }) {
    this._nameElement.textContent = name;
    this._imageElement.alt = name;
    this._imageElement.src = imageUrl;
    super.open();
  }
}
