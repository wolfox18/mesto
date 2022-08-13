export class UserInfo {
  constructor(data) {
    this._nameElement = document.querySelector(data.nameSelector);
    this._bioElement = document.querySelector(data.bioSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
    };
  }
  setUserInfo({name, bio}) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = bio;
  }
}
