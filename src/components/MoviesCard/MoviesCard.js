import React from 'react'
import { useLocation } from 'react-router-dom'
import { movieImgUrl } from '../../tools/Const'

export default function MoviesCard({ movieData }) {
  const [isMovieSaved, setIsMovieSaved] = React.useState(false)
  const location = useLocation()

  const movieDurationHours = Math.floor(movieData.duration / 60)
  const movieDuration = `${movieDurationHours}ч ${movieData.duration - movieDurationHours * 60}мин`

  const addButton = (
    <button
      onClick={addMovie}
      type="button"
      className={`movie-card__button movie-card__button_type_save ${
        isMovieSaved ? 'movie-card__button_added' : ''
      } button`}>
      {isMovieSaved ? '✓' : 'Сохранить'}
    </button>
  )

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
      {location.pathname === '/movies' ? addButton : deleteButton}
      <img
        className="movie-card__img"
        src={`${movieImgUrl}${movieData.image.url}`}
        alt="Девушка с картинки"
      />
      <div className="movie-card__information">
        <h2 className="movie-card__title">{movieData.nameRU}</h2>
        <p className="movie-card__duration">{movieDuration}</p>
      </div>
    </article>
  )
}
