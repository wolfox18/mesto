export class Api {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
  }
  _handleResponse(res){
    if (res.ok) {
        return res.json();
      }
      throw new Error("Ошибка внутри API!");
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        headers: this._headers,
      }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }
  patchUserInfo(userData){
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(userData)
    }).then(this._handleResponse);
  }
  postNewCard(cardData){
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(cardData)
    }).then(this._handleResponse);
  }
  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
  }).then(this._handleResponse);
  }
  addLike(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
  }).then(this._handleResponse);
  }
  deleteLike(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
  }).then(this._handleResponse);
  }

  // другие методы работы с API
}
