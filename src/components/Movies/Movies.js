import React from 'react'
import { useLocation } from 'react-router-dom'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound'
import MoviesCardListSaved from '../MoviesCardList_Saved/MoviesCardListSaved'
import { getSavedMovies, saveMovie } from '../../utils/MainApi'

export default function Movies({ windowWidth }) {
  const location = useLocation()

  const [showedMovies, setShowedMovies] = React.useState([])
  const [foundMovies, setFoundMovies] = React.useState([])
  const [savedMovies, setSavedMovies] = React.useState([])

  const [moviesNotFound, setMoviesNotFound] = React.useState(false)
  const [loader, setLoader] = React.useState(false)

  const [searchInput, setSearchInput] = React.useState('')
  const [searchCheckbox, setSearchCheckbox] = React.useState(false)

  function handleSaveMovie(movieData) {
    saveMovie(movieData).then((res) => setSavedMovies([...savedMovies, res]))
  }

  React.useEffect(() => {
    getSavedMovies()
      .then((res) => setSavedMovies(res))
      .catch((err) => console.log(err))

    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'))
    if (lastSearch === null) {
      setSearchInput('')
      setSearchCheckbox(false)
      setFoundMovies([])
      return
    }
    setSearchInput(lastSearch.input)
    setSearchCheckbox(lastSearch.checkbox)
    setFoundMovies(lastSearch.result)
  }, [])

  return (
    <main className="main movies">
      <SearchForm
        setFoundMovies={setFoundMovies}
        setLoader={setLoader}
        setMoviesNotFound={setMoviesNotFound}
        searchCheckbox={searchCheckbox}
        setSearchCheckbox={setSearchCheckbox}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {moviesNotFound && <MoviesNotFound />}
      {loader && <Preloader />}
      {location.pathname === '/movies' && foundMovies.length > 0 && (
        <MoviesCardList
          windowWidth={windowWidth}
          foundMovies={foundMovies}
          showedMovies={showedMovies}
          setShowedMovies={setShowedMovies}
          handleSaveMovie={handleSaveMovie}
          savedMovies={savedMovies}
        />
      )}
      {location.pathname === '/saved-movies' && <MoviesCardListSaved savedMovies={savedMovies} />}
    </main>
  )
}
