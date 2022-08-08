import { Popup } from "./Popup";
export class PopupWithImage extends Popup {
  constructor(data) {
    super(data);
    this._nameElement = this._element.querySelector(data.nameSelector);
    this._imageElement = this._element.querySelector(data.imageSelector);
  }
  open({ imageName, imageUrl }) {
    this._imageElement.textContent = imageName;
    this._imageElement.alt = "Фотография «" + imageName + "»";
    this._nameElement.src = imageUrl;
    super.open();
  }
}
