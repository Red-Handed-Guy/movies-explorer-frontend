export default function NavTab() {
  return (
    <nav className="nav-tab promo__nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item">
          <a className="nav-tab__link button" href="#about-project">
            О проекте
          </a>
        </li>
        <li className="nav-tab__item">
          <a className="nav-tab__link button" href="#techs">
            Технологии
          </a>
        </li>
        <li className="nav-tab__item">
          <a className="nav-tab__link button" href="#about-me">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  )
}
