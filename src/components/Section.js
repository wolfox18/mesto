export class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }
  _clear() {
    this._container.innerHTML = "";
  }
  renderItems(items) {
    this._clear();
    items.forEach((item) => {
      this.addItem(item, false);
    });
  }
  deleteItem(item){
    item.remove();
  }
  addItem(element, isInStart) {
    if (isInStart) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
