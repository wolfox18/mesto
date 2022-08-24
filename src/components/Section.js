export class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  _clear() {
    this._container.innerHTML = "";
  }
  renderItems(items) {
    this._clear();
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element, isInStart) {
    if (isInStart) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
