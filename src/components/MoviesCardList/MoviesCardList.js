import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import { numberOfDisplayedMovies, itemWidth } from '../../tools/Const'

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
    function showInitailMovies({ display, add }) {
      return [setShowedMovies(foundMovies.slice(0, display)), setFilmsMultiplier(add)]
    }

    if (itemWidth.threeColumns < windowWidth) {
      showInitailMovies(numberOfDisplayedMovies.pcScreen)
    }
    if (itemWidth.twoColumns < windowWidth && windowWidth <= itemWidth.threeColumns) {
      showInitailMovies(numberOfDisplayedMovies.tabletScreen)
    }
    if (windowWidth <= itemWidth.twoColumns) {
      showInitailMovies(numberOfDisplayedMovies.mobileScreen)
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
