import React from 'react'
import { useLocation } from 'react-router-dom'

export default function MoviesCard({ src }) {
  const [isMovieSaved, setIsMovieSaved] = React.useState(false)
  const location = useLocation()

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
      <img className="movie-card__img" src={src} alt="Девушка с картинки" />
      <div className="movie-card__information">
        <h2 className="movie-card__title">Gimme Danger: История Игги и The Stooges</h2>
        <p className="movie-card__duration">1ч 17м</p>
      </div>
    </article>
  )
}
