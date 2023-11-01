export default function SearchForm() {
  return (
    <form className="movies__search-form search-form">
      <div className="search-form__input-wrapper">
        <input className="search-form__input" type="text" required name="movies" placeholder="Фильм" />
        <button type="submit" className="search-form__submit button"></button>
      </div>
      <div className="search-form__switch-wrapper">
        <label className="search-form__switch">
          <input className="search-form__check-input" type="checkbox" />
          <span className="search-form__slider"></span>
        </label>
        <p className="search-form__switch-text">Короткометражки</p>
      </div>
    </form>
  )
}
