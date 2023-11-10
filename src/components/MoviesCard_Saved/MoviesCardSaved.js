import React from 'react'
import { movieImgUrl } from '../../tools/Const'
import { saveMovie } from '../../utils/MainApi'

export default function MoviesCard({ movieData }) {
  const [isMovieSaved, setIsMovieSaved] = React.useState(false)

  const movieDurationHours = Math.floor(movieData.duration / 60)
  const movieDuration = `${movieDurationHours}ч ${movieData.duration - movieDurationHours * 60}мин`

  const deleteButton = (
    <button
      onClick={addMovie}
      type="button"
      className="button movie-card__button movie-card__button_type_del"></button>
  )

  function addMovie() {
    setIsMovieSaved(!isMovieSaved)
  }


  return (
    <article className="movie-card">
      {deleteButton}
      <img className="movie-card__img" src={movieData.image} alt={movieData.nameRU} />
      <div className="movie-card__information">
        <h2 className="movie-card__title">{movieData.nameRU}</h2>
        <p className="movie-card__duration">{movieDuration}</p>
      </div>
    </article>
  )
}
