export class UserInfo {
  constructor(data) {
    this._nameElement = document.querySelector(data.nameSelector);
    this._bioElement = document.querySelector(data.bioSelector);
  }
  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
    };
    return userData;
  }
  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._bioElement.textContent = userData.bio;
  }
}
