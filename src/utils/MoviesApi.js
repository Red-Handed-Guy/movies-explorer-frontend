import { moviesUrl } from "../tools/Const"


export const getMovies = () => {
  return fetch(moviesUrl, {
    method: 'GET',
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

