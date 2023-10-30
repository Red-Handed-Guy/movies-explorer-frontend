import React from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList() {
  const [movies, setMovies] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8])
  const location = useLocation()

  console.log(window.history.state)
  console.log(location.state)
  function addCards() {
    let newMovies = []
    for (let i = 1; i < 10; i++) {
      newMovies.push(movies.at(-1) + i)
    }
    console.log(newMovies)
    setMovies([...movies, ...newMovies])
  }

  return (
    <section className="movies-list" aria-label="Список фильмов">
      <div className="movies-list__cards">
        {movies.map((movie) => {
          return (
            <MoviesCard
              key={movie}
              src="https://c.wallhere.com/photos/6d/a1/women_brunette_lingerie_bathrobes_see_through_clothing_lace_chair_sitting-1176512.jpg!d"
            />
          )
        })}
      </div>
      {location.pathname === '/movies' && (
        <button onClick={addCards} className="movies-list__button button">
          Ещё
        </button>
      )}
    </section>
  )
}
