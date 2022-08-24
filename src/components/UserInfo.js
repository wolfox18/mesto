export class UserInfo {
  constructor(data) {
    this._nameElement = document.querySelector(data.nameSelector);
    this._bioElement = document.querySelector(data.bioSelector);
    this._avatarElement = document.querySelector(data.avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._bioElement.textContent,
      id: this._id,
    };
  }
  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = about;
    this._avatarElement.src = avatar;
    this.id = _id;
  }
}
