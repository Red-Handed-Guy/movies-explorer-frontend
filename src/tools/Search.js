export default function letSearch(movie, inputValue, searchCheckbox) {
  if (searchCheckbox) {
    if (movie.duration > 40) {
      return false
    } else {
      return movie.nameRU
        .toLowerCase()
        .replace(/[^а-яёa-z0-9]/gi, '')
        .replace(/ё/gi, 'е')
        .includes(
          inputValue
            .toLowerCase()
            .replace(/[^а-яёa-z0-9]/gi, '')
            .replace(/ё/gi, 'е')
        )
    }
  }

  return movie.nameRU
    .toLowerCase()
    .replace(/[^а-яёa-z0-9]/gi, '')
    .replace(/ё/gi, 'е')
    .includes(
      inputValue
        .toLowerCase()
        .replace(/[^а-яёa-z0-9]/gi, '')
        .replace(/ё/gi, 'е')
    )
}
