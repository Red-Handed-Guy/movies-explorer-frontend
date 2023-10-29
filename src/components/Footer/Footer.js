export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrapper">
        <p className="footer__copyright">&#169; 2023</p>
        <ul className="footer__links">
          <li className="footer__item">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://practicum.yandex.ru/"
              className="footer__link link">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Red-Handed-Guy"
              className="footer__link link">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
