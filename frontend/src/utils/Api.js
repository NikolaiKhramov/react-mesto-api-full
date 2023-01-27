class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
  }

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkIfResIsOk)
  }

  _checkIfResIsOk(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo(jwt) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
  }

    getInitialCards(jwt) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      }
    })
  }

  editProfileInfo(info, jwt) {
    console.log(info);
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
  }

  addNewPlaceCard(cardData, jwt) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
  }

  deletePlaceCard(id, jwt) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      }
    })
  }

  changeLikeCardStatus(id, isLiked, jwt) {
    if (!isLiked) {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        }
      })
    } else {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        }
      })
    }
  }

  editUserAvatar(data, jwt) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }

  getContent(jwt) {
    return Promise.all([this.getInitialCards(jwt), this.getUserInfo(jwt)]);
  }

  signUp(email, password) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }

  signIn(email, password) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }

  tokenCheck(jwt) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      }
    })
  }

}

export const api = new Api({
  baseUrl: "http://api.b3tt3rlvck.nomoredomainsclub.ru"
});
