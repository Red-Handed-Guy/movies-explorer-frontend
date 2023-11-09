import React from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({ movies }) {
  let savedMovies = movies
  const location = useLocation()

  return (
    <section className="movies-list" aria-label="Список фильмов">
      <div className="movies-list__cards">
        {movies.map((movieData) => {
          return <MoviesCard key={movieData.id} movieData={movieData} />
        })}
      </div>
      {location.pathname === '/movies' && (
        <button className="movies-list__button button">Ещё</button>
      )}
    </section>
  )
}
