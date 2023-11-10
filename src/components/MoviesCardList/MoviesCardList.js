import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'

export default function MoviesCardList({
  windowWidth,
  foundMovies,
  setShowedMovies,
  showedMovies,
  handleSaveMovie,
  savedMovies,
  handleDeleteMovie,
}) {
  const [filmsMultiplier, setFilmsMultiplier] = React.useState(3)

  React.useEffect(() => {
    if (1000 < windowWidth) {
      setShowedMovies(foundMovies.slice(0, 12))
      setFilmsMultiplier(3)
    }
    if (500 < windowWidth && windowWidth <= 1000) {
      setShowedMovies(foundMovies.slice(0, 8))
      setFilmsMultiplier(2)
    }

    if (windowWidth <= 500) {
      setShowedMovies(foundMovies.slice(0, 5))
      setFilmsMultiplier(2)
    }
  }, [foundMovies, setShowedMovies, windowWidth])

  function getMoreMovies() {
    setShowedMovies([
      ...showedMovies,
      ...foundMovies.slice(showedMovies.length, showedMovies.length + filmsMultiplier),
    ])
    console.log()
  }

  return (
    <section className="movies-list" aria-label="Список фильмов">
      <div className="movies-list__cards">
        {showedMovies.map((movieData) => {
          let savedId
          savedMovies.forEach((savedMovie) => {
            if (savedMovie.movieId === movieData.id) {
              savedId = savedMovie._id
            }
          })
          return (
            <MoviesCard
              key={movieData.id}
              movieData={movieData}
              handleSaveMovie={handleSaveMovie}
              savedId={savedId}
              handleDeleteMovie={handleDeleteMovie}
            />
          )
        })}
      </div>
      {!(foundMovies.length === showedMovies.length) && (
        <button onClick={getMoreMovies} className="movies-list__button button">
          Ещё
        </button>
      )}
    </section>
  )
}
