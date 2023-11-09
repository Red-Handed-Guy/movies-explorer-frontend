import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../Context/Context'

export default function Navigation({ asideNav, setAsideNav }) {
  const currentUser = React.useContext(CurrentUserContext)
  function closeAsideNav() {
    setAsideNav(false)
  }
  return (
    <nav className={`navigation header__aside-nav ${asideNav ? 'navigation_active' : ''}`}>
      <div onClick={closeAsideNav} className="navigation__empty"></div>
      <div className="navigation__wrapper">
        <button onClick={closeAsideNav} className="navigation__close-button button"></button>
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink
              className={({ isActive }) =>
                `navigation__link link ${isActive ? 'navigation__link_active' : ''}`
              }
              to="/"
              onClick={closeAsideNav}>
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              className={({ isActive }) =>
                `navigation__link link ${isActive ? 'navigation__link_active' : ''}`
              }
              to="/movies"
              onClick={closeAsideNav}>
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              className={({ isActive }) =>
                `navigation__link link ${isActive ? 'navigation__link_active' : ''}`
              }
              to="/saved-movies"
              onClick={closeAsideNav}>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <Link className="navigation__user button" to="/profile" onClick={closeAsideNav}>
          {currentUser.email}
        </Link>
      </div>
    </nav>
  )
}
