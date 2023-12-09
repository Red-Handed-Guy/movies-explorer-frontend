import React from 'react'
import MoviesCardSaved from '../MoviesCard_Saved/MoviesCardSaved'

export default function MoviesCardListSaved({ handleDeleteMovie, shownSavedMovies }) {
  return (
    <section className="movies-list" aria-label="Список сохраненных фильмов">
      <div className="movies-list__cards">
        {shownSavedMovies.map((movieData) => {
          return (
            <MoviesCardSaved
              key={movieData._id}
              movieData={movieData}
              handleDeleteMovie={handleDeleteMovie}
            />
          )
        })}
      </div>
    </section>
  )
}
