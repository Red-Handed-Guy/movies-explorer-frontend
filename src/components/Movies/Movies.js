import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound'

const loader = false
const foundMovies = false

export default function Movies({ movies }) {
  return (
    <main className="main movies">
      <SearchForm />
      {foundMovies ? <MoviesNotFound /> : ''}
      {loader ? <Preloader /> : ''}
      <MoviesCardList movies={movies} />
    </main>
  )
}
