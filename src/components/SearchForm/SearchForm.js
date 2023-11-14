import React from 'react'
import { getMovies } from '../../utils/MoviesApi'
import { useLocation } from 'react-router-dom'

export default function SearchForm({
  setLoader,
  searchCheckbox,
  setSearchCheckbox,
  setSearchInputMovieFilter,
  setBeatfilmMovies,
  beatfilmMovies,
  searchInput,
  setSearchInput,
  searchInputSavedMovies,
  setSearchInputSavedMovies,
  setSearchInputSavedMoviesFilter,
  searchCheckboxSavedMovies,
  setSearchCheckboxSavedMovies,
}) {
  // movies input err
  const [searchInputErr, setSearchInputErr] = React.useState('')

  // saved-movies input err
  const [searchInputErrSaveMovies, setSearchInputErrSaveMovies] = React.useState('')

  const [isRequestSending, setIsRequestSending] = React.useState(false)

  const location = useLocation()

  //! сброс ошибок инпута при смене страницы
  React.useEffect(() => {
    if (location.pathname !== '/saved-movies') {
      setSearchInputErrSaveMovies('')
    }

    if (location.pathname !== '/movies') {
      setSearchInputErr('')
    }
  }, [location.pathname])

  //! movies, saved-movies inputs listeners
  function handleChangeSearchInput(e) {
    if (location.pathname === '/movies') {
      setSearchInput(e.target.value)
      if (e.target.value.length > 0) {
        setSearchInputErr('')
      }
    } else {
      setSearchInputSavedMovies(e.target.value)
      if (e.target.value.length > 0) {
        setSearchInputErrSaveMovies('')
      }
    }
  }

  function handleChangeSearchСheckbox(e) {
    setSearchCheckbox(e.target.checked)
    localStorage.setItem('lastCheckbox', JSON.stringify(e.target.checked))
  }

  function handleChangeSearchСheckboxSaveMovies(e) {
    setSearchCheckboxSavedMovies(e.target.checked)
  }

  //! Submit movies
  function handleFormSubmit(e) {
    e.preventDefault()
    if (searchInput === '') {
      setSearchInputErr('Нужно ввести ключевое слово')
      return
    }
    if (beatfilmMovies.length > 0) {
      setSearchInputMovieFilter(searchInput)
      localStorage.setItem('lastInput', searchInput)
      localStorage.setItem('lastCheckbox', searchCheckbox)
      return
    }
    setIsRequestSending(true)
    setLoader(true)
    getMovies()
      .then((res) => {
        setBeatfilmMovies(res)
        setSearchInputMovieFilter(searchInput)
        localStorage.setItem('lastInput', searchInput)
        localStorage.setItem('lastCheckbox', JSON.stringify(searchCheckbox))
        localStorage.setItem('movies', JSON.stringify(res))
      })
      .catch(() => {
        setSearchInputErr('Что-то пошло не так')
        setTimeout(() => {
          setSearchInputErr('')
        }, 3000)
      })
      .finally(() => {
        setLoader(false)
        setIsRequestSending(false)
      })
  }

  //! Submit saved-movies
  function handleFormSubmitSavedMovies(e) {
    e.preventDefault()
    if (searchInputSavedMovies === '') {
      setSearchInputErrSaveMovies('Нужно ввести ключевое слово')
      return
    }
    setSearchInputSavedMoviesFilter(searchInputSavedMovies)
  }

  return (
    <form
      onSubmit={location.pathname === '/movies' ? handleFormSubmit : handleFormSubmitSavedMovies}
      noValidate
      className="movies__search-form search-form">
      <div className="search-form__input-wrapper">
        <input
          value={location.pathname === '/movies' ? searchInput : searchInputSavedMovies}
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
          {location.pathname === '/movies' && (
            <input
              checked={searchCheckbox ? true : ''}
              onChange={handleChangeSearchСheckbox}
              className="search-form__check-input"
              type="checkbox"
            />
          )}
          {location.pathname === '/saved-movies' && (
            <input
              checked={searchCheckboxSavedMovies ? true : ''}
              onChange={handleChangeSearchСheckboxSaveMovies}
              className="search-form__check-input"
              type="checkbox"
            />
          )}
          <span className="search-form__slider"></span>
        </label>
        <p className="search-form__switch-text">Короткометражки</p>
      </div>
    </form>
  )
}
