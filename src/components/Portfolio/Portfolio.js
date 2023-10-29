export default function Portfolio() {
  return (
    <article className="about-me__portfolio portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
            href="https://storage.googleapis.com/pai-images/7dfe00208dc14a3fa4176d2aad23056c.jpeg">
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-text">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
            href="https://storage.googleapis.com/pai-images/7dfe00208dc14a3fa4176d2aad23056c.jpeg">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-text">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
            href="https://storage.googleapis.com/pai-images/7dfe00208dc14a3fa4176d2aad23056c.jpeg">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-text">&#8599;</p>
          </a>
        </li>
      </ul>
    </article>
  )
}
