import React from 'react'
import { useLocation } from 'react-router-dom'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound'
import MoviesNotAdded from '../MoviesNotAdded/MoviesNotAdded'
import MoviesCardListSaved from '../MoviesCardList_Saved/MoviesCardListSaved'
import letSearch from '../../tools/Search'
import { getSavedMovies, saveMovie, deleteMovie } from '../../utils/MainApi'

export default function Movies({ windowWidth }) {
  const location = useLocation()

  //! movies
  const [beatfilmMovies, setBeatfilmMovies] = React.useState([])
  const [foundMovies, setFoundMovies] = React.useState([])
  const [showedMovies, setShowedMovies] = React.useState([])

  // movies inputs
  const [searchInput, setSearchInput] = React.useState('')
  const [searchInputMovieFilter, setSearchInputMovieFilter] = React.useState('')
  const [searchCheckbox, setSearchCheckbox] = React.useState(false)

  // movies not found
  const [moviesNotFound, setMoviesNotFound] = React.useState(false)
  const [activeSearch, setActiveSearch] = React.useState(false)

  //! saved-movies
  const [savedMovies, setSavedMovies] = React.useState([])
  const [shownSavedMovies, setShownSavedMovies] = React.useState([])

  // saved-movies inputs
  const [searchInputSavedMovies, setSearchInputSavedMovies] = React.useState('')
  const [searchInputSavedMoviesFilter, setSearchInputSavedMoviesFilter] = React.useState('')
  const [searchCheckboxSavedMovies, setSearchCheckboxSavedMovies] = React.useState(false)

  // saved-movies movies not found
  const [savedMoviesNotFound, setSavedMoviesNotFound] = React.useState(false)
  const [savedMoviesNotAdded, setSavedMoviesNotAdded] = React.useState(false)

  //! loader
  const [loader, setLoader] = React.useState(false)

  function handleSaveMovie(movieData) {
    saveMovie(movieData).then((res) => setSavedMovies([...savedMovies, res]))
  }

  function handleDeleteMovie(movieId) {
    deleteMovie(movieId).then((deletedMovie) =>
      setSavedMovies((state) => state.filter((movie) => movie._id !== deletedMovie._id))
    )
  }

  //! MOVIES восстановление последнего поиска + запрос SAVED-MOVIES
  React.useEffect(() => {
    getSavedMovies()
      .then((res) => setSavedMovies(res))
      .catch((err) => console.log(err))

    const lastInput = localStorage.getItem('lastInput')
    const lastCheckbox = JSON.parse(localStorage.getItem('lastCheckbox'))
    const lastMovies = JSON.parse(localStorage.getItem('movies'))

    if (lastInput === undefined || lastCheckbox === undefined || lastMovies === undefined) {
      setSearchInputMovieFilter('')
      setSearchCheckbox(false)
      setBeatfilmMovies([])
      return
    }
    setSearchInputMovieFilter(lastInput)
    setSearchInput(lastInput)
    setSearchCheckbox(lastCheckbox)
    setBeatfilmMovies(lastMovies)
  }, [])

  //! MOVIES фильтр фильмов по результатам поиска
  React.useEffect(() => {
    if (beatfilmMovies.length > 0) {
      setActiveSearch(true)
    }
    const searchResult = beatfilmMovies.filter((movie) =>
      letSearch(movie, searchInputMovieFilter, searchCheckbox)
    )
    if (searchResult.length === 0) {
      setMoviesNotFound(true)
    } else {
      setMoviesNotFound(false)
    }
    setFoundMovies(searchResult)
  }, [beatfilmMovies, searchCheckbox, searchInputMovieFilter])

  //! SAVED-MOVIES фильтр фильмов по результатам поиска
  React.useEffect(() => {
    if (savedMovies.length === 0) {
      setSavedMoviesNotAdded(true)
    } else {
      setSavedMoviesNotAdded(false)
    }

    if (location.pathname !== '/saved-movies') {
      setSearchCheckboxSavedMovies(false)
      setSearchInputSavedMoviesFilter('')
      setSearchInputSavedMovies('')
    }

    const searchResult = savedMovies.filter((movie) =>
      letSearch(movie, searchInputSavedMoviesFilter, searchCheckboxSavedMovies)
    )
    if (searchResult.length === 0) {
      setSavedMoviesNotFound(true)
    } else {
      setSavedMoviesNotFound(false)
    }
    setShownSavedMovies(searchResult)
  }, [location.pathname, savedMovies, searchCheckboxSavedMovies, searchInputSavedMoviesFilter])

  return (
    <main className="main movies">
      <SearchForm
        setLoader={setLoader}
        searchCheckbox={searchCheckbox}
        setSearchCheckbox={setSearchCheckbox}
        setSearchInputMovieFilter={setSearchInputMovieFilter}
        setBeatfilmMovies={setBeatfilmMovies}
        beatfilmMovies={beatfilmMovies}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchInputSavedMovies={searchInputSavedMovies}
        setSearchInputSavedMovies={setSearchInputSavedMovies}
        setSearchInputSavedMoviesFilter={setSearchInputSavedMoviesFilter}
        searchCheckboxSavedMovies={searchCheckboxSavedMovies}
        setSearchCheckboxSavedMovies={setSearchCheckboxSavedMovies}
      />
      {activeSearch && moviesNotFound && location.pathname === '/movies' && <MoviesNotFound />}
      {!savedMoviesNotAdded && savedMoviesNotFound && location.pathname === '/saved-movies' && (
        <MoviesNotFound />
      )}
      {location.pathname === '/saved-movies' && savedMoviesNotAdded && <MoviesNotAdded />}
      {loader && <Preloader />}
      {location.pathname === '/movies' && foundMovies.length > 0 && (
        <MoviesCardList
          windowWidth={windowWidth}
          foundMovies={foundMovies}
          showedMovies={showedMovies}
          setShowedMovies={setShowedMovies}
          handleSaveMovie={handleSaveMovie}
          savedMovies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
        />
      )}
      {location.pathname === '/saved-movies' && (
        <MoviesCardListSaved
          handleDeleteMovie={handleDeleteMovie}
          shownSavedMovies={shownSavedMovies}
        />
      )}
    </main>
  )
}
