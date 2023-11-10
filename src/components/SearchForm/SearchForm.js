import React from 'react'
import { getMovies } from '../../utils/MoviesApi'
import { useLocation } from 'react-router-dom'
import letSearch from '../../tools/Search'

export default function SearchForm({
  setFoundMovies,
  setLoader,
  setMoviesNotFound,
  searchCheckbox,
  setSearchCheckbox,
  searchInput,
  setSearchInput,
  setShownSavedMovies,
  savedMovies,
  setSavedMoviesNotFound,
  setBeatfilmMovies,
  beatfilmMovies,
}) {
  const [searchInputErr, setSearchInputErr] = React.useState('')
  const [searchInputSaveMovies, setSearchInputSaveMovies] = React.useState('')
  const [searchInputErrSaveMovies, setSearchInputErrSaveMovies] = React.useState('')

  const [isRequestSending, setIsRequestSending] = React.useState(false)
  const location = useLocation()

  function handleChangeSearchInput(e) {
    if (location.pathname === '/movies') {
      setSearchInput(e.target.value)
      if (e.target.value.length > 0) {
        setSearchInputErr('')
      }
    } else {
      setSearchInputSaveMovies(e.target.value)
      if (e.target.value.length > 0) {
        setSearchInputErrSaveMovies('')
      }
    }
  }

  function handleChangeSearchСheckbox(e) {
    setSearchCheckbox(e.target.checked)
  }

  function searchMovies(movies) {
    const searchResult = movies.filter((movie) => letSearch(movie, searchInput, searchCheckbox))
    if (searchResult.length === 0) {
      setMoviesNotFound(true)
    } else {
      setMoviesNotFound(false)
    }
    const lastSearch = {
      input: searchInput,
      checkbox: searchCheckbox,
      result: searchResult,
    }

    localStorage.setItem('lastSearch', JSON.stringify(lastSearch))

    setFoundMovies(searchResult)
    setLoader(false)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    if (searchInput === '') {
      setSearchInputErr('Нужно ввести ключевое слово')
      return
    }
    if (beatfilmMovies.length > 0) {
      searchMovies(beatfilmMovies)
      return
    }
    setIsRequestSending(true)
    setFoundMovies([])
    setLoader(true)
    getMovies()
      .then((res) => {
        setBeatfilmMovies(res)
        searchMovies(res)
      })
      .catch((err) => {
        setLoader(false)
        console.log(err)
        setSearchInputErr('Что-то пошло не так')
        setTimeout(() => {
          setSearchInputErr('')
        }, 3000)
      })
      .finally(() => {
        setIsRequestSending(false)
      })
  }

  function handleFormSubmitSavedMovies(e) {
    e.preventDefault()
    if (searchInputSaveMovies === '') {
      setSearchInputErrSaveMovies('Нужно ввести ключевое слово')
      return
    }
    const searchResult = savedMovies.filter((movie) =>
      letSearch(movie, searchInputSaveMovies, searchCheckbox)
    )

    if (searchResult.length === 0) {
      setSavedMoviesNotFound(true)
    } else {
      setSavedMoviesNotFound(false)
    }

    setShownSavedMovies(searchResult)
  }

  return (
    <form
      onSubmit={location.pathname === '/movies' ? handleFormSubmit : handleFormSubmitSavedMovies}
      noValidate
      className="movies__search-form search-form">
      <div className="search-form__input-wrapper">
        <input
          value={location.pathname === '/movies' ? searchInput : searchInputSaveMovies}
          onChange={handleChangeSearchInput}
          className="search-form__input"
          type="text"
          required
          name="movies"
          placeholder="Фильм"
        />
        <button
          disabled={!isRequestSending ? '' : true}
          type="submit"
          className="search-form__submit button"></button>
      </div>
      <p className="search-form__input-err">
        {location.pathname === '/movies' ? searchInputErr : searchInputErrSaveMovies}
      </p>
      <div className="search-form__switch-wrapper">
        <label className="search-form__switch">
          <input
            checked={searchCheckbox ? true : ''}
            onChange={handleChangeSearchСheckbox}
            className="search-form__check-input"
            type="checkbox"
          />
          <span className="search-form__slider"></span>
        </label>
        <p className="search-form__switch-text">Короткометражки</p>
      </div>
    </form>
  )
}
