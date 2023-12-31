import { movieImgUrl } from '../tools/Const'
const { NODE_ENV, REACT_APP_BASE_URL } = process.env

const BASE_URL = NODE_ENV === 'production' ? REACT_APP_BASE_URL : 'http://127.0.0.1:3000'

function getResponseData(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = ({ password, email, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email, name }),
  }).then((res) => {
    return getResponseData(res)
  })
}

export const login = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return getResponseData(res)
  })
}

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'PATCH',
    credentials: 'include',
  }).then((res) => {
    if (res.ok) {
      return res
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => {
    return getResponseData(res)
  })
}

export const patchUser = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => {
    return getResponseData(res)
  })
}

export const saveMovie = (movie) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id } =
    movie
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: `${movieImgUrl}${image.url}`,
      trailerLink: trailerLink,
      nameRU: nameRU,
      nameEN: nameEN,
      thumbnail: `${movieImgUrl}${image.formats.thumbnail.url}`,
      movieId: id,
    }),
  }).then((res) => {
    return getResponseData(res)
  })
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => {
    return getResponseData(res)
  })
}

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((res) => {
    return getResponseData(res)
  })
}