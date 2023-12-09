import React from 'react'

export default function MoviesCardSaved({ movieData, handleDeleteMovie }) {
  const movieDurationHours = Math.floor(movieData.duration / 60)
  const movieDuration = `${movieDurationHours}ч ${movieData.duration - movieDurationHours * 60}мин`

  function deleteMovie() {
    handleDeleteMovie(movieData._id)
  }

  const deleteButton = (
    <button
      onClick={deleteMovie}
      type="button"
      className="movie-card__button movie-card__button_type_del"></button>
  )

  return (
    <article className="movie-card">
      {deleteButton}
      <a className="movie-card__link" href={movieData.trailerLink} target="_blank" rel="noreferrer">
        <img className="movie-card__img" src={movieData.image} alt={movieData.nameRU} />
      </a>
      <div className="movie-card__information">
        <h2 className="movie-card__title">{movieData.nameRU}</h2>
        <p className="movie-card__duration">{movieDuration}</p>
      </div>
    </article>
  )
}
