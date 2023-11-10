import React from 'react'
import { getMovies } from '../../utils/MoviesApi'
import letSearch from '../../tools/Search'

export default function SearchForm({
  setFoundMovies,
  setLoader,
  setMoviesNotFound,
  searchCheckbox,
  setSearchCheckbox,
  searchInput,
  setSearchInput,
}) {
  const [searchInputErr, setSearchInputErr] = React.useState('')

  function handleChangeSearchInput(e) {
    setSearchInput(e.target.value)
    if (e.target.value.length > 0) {
      setSearchInputErr('')
    }
  }

  function handleChangeSearchСheckbox(e) {
    setSearchCheckbox(e.target.checked)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    if (searchInput === '') {
      setSearchInputErr('Нужно ввести ключевое слово')
      return
    }
    setFoundMovies([])
    setLoader(true)
    getMovies()
      .then((res) => {
        const searchResult = res.filter((movie) => letSearch(movie, searchInput, searchCheckbox))
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
      })
      .catch((err) => {
        setLoader(false)
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleFormSubmit} noValidate className="movies__search-form search-form">
      <div className="search-form__input-wrapper">
        <input
          value={searchInput}
          onChange={handleChangeSearchInput}
          className="search-form__input"
          type="text"
          required
          name="movies"
          placeholder="Фильм"
        />
        <button type="submit" className="search-form__submit button"></button>
      </div>
      <p className="search-form__input-err">{searchInputErr}</p>
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
