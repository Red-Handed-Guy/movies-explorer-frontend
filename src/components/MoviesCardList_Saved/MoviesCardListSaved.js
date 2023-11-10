import React from 'react'
import MoviesCardSaved from '../MoviesCard_Saved/MoviesCardSaved'

export default function MoviesCardListSaved({ savedMovies }) {
  return (
    <section className="movies-list" aria-label="Список сохраненных фильмов">
      <div className="movies-list__cards">
        {savedMovies.map((movieData) => {
          return <MoviesCardSaved key={movieData._id} movieData={movieData} />
        })}
      </div>
    </section>
  )
}
