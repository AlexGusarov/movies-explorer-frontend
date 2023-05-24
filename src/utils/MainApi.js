import { BASE_URL } from "./constants";

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => this._checkResponse(res))
  };

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => this._checkResponse(res))
  }

  getUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((res) => this._checkResponse(res))
  }

  saveMovie(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(id) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._checkResponse(res));
  }

  getSavedMovies() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => this._checkResponse(res));
  }



}

const MainApi = new Api(BASE_URL);

export default MainApi;