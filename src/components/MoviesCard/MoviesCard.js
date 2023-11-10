import React from 'react'
import { movieImgUrl } from '../../tools/Const'

export default function MoviesCard({ movieData, handleSaveMovie, savedId }) {
  const [isMovieSaved, setIsMovieSaved] = React.useState(false)

  React.useEffect(() =>{
    if(savedId){
      setIsMovieSaved(true)
    }
  },[savedId])


  const movieDurationHours = Math.floor(movieData.duration / 60)
  const movieDuration = `${movieDurationHours}ч ${movieData.duration - movieDurationHours * 60}мин`

  const addButton = (
    <button
      onClick={isMovieSaved? onSaveMovie : ''}
      type="button"
      className={`movie-card__button movie-card__button_type_save ${
        isMovieSaved ? 'movie-card__button_added' : ''
      } button`}>
      {isMovieSaved ? '✓' : 'Сохранить'}
    </button>
  )

  function onSaveMovie() {
    handleSaveMovie(movieData)
    setIsMovieSaved(true)
  }

  return (
    <article className="movie-card">
      {addButton}
      <img
        className="movie-card__img"
        src={`${movieImgUrl}${movieData.image.url}`}
        alt={movieData.nameRU}
      />
      <div className="movie-card__information">
        <h2 className="movie-card__title">{movieData.nameRU}</h2>
        <p className="movie-card__duration">{movieDuration}</p>
      </div>
    </article>
  )
}
