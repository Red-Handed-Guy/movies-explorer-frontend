import React from 'react'
import { movieImgUrl } from '../../tools/Const'

export default function MoviesCard({ movieData, handleSaveMovie, savedId, handleDeleteMovie }) {
  const [isMovieSaved, setIsMovieSaved] = React.useState(false)

  React.useEffect(() => {
    if (savedId) {
      setIsMovieSaved(true)
    }
  }, [savedId])

  const movieDurationHours = Math.floor(movieData.duration / 60)
  const movieDuration = `${movieDurationHours}ч ${movieData.duration - movieDurationHours * 60}мин`

  function saveMovie() {
    handleSaveMovie(movieData)
    setIsMovieSaved(true)
  }

  function deleteMovie() {
    handleDeleteMovie(savedId)
    setIsMovieSaved(false)
  }

  const addButton = (
    <button
      onClick={isMovieSaved ? deleteMovie : saveMovie}
      type="button"
      className={`movie-card__button movie-card__button_type_save ${
        isMovieSaved ? 'movie-card__button_added' : ''
      } button`}>
      {isMovieSaved ? '✓' : 'Сохранить'}
    </button>
  )

  return (
    <article className="movie-card">
      {addButton}
      <a className="movie-card__link" href={movieData.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movie-card__img"
          src={`${movieImgUrl}${movieData.image.url}`}
          alt={movieData.nameRU}
        />
      </a>
      <div className="movie-card__information">
        <h2 className="movie-card__title">{movieData.nameRU}</h2>
        <p className="movie-card__duration">{movieDuration}</p>
      </div>
    </article>
  )
}
