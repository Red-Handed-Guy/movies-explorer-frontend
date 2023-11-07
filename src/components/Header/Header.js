import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import headerLogo from '../../img/header/logo.svg'
import Navigation from '../Navigation/Navigation'

const isLoggedin = true

export default function Header() {
  const [windowWidth, setWindowWidth] = React.useState(document.documentElement.clientWidth)
  const [asideNav, setAsideNav] = React.useState(false)

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(document.documentElement.clientWidth)
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  React.useEffect(() => {
    if (windowWidth > 768) {
      setAsideNav(false)
    }
  }, [windowWidth])

  function checkWindowWidth() {
    return windowWidth > 768
  }

  function openAsideNav() {
    setAsideNav(true)
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__logo-link button" to="/">
          <img className="header__logo" src={headerLogo} alt="Логотип приложения" />
        </Link>
        {isLoggedin && checkWindowWidth() && (
          <ul className="header__list">
            <li className="header__list-item">
              <NavLink
                className={({ isActive }) =>
                  `header__list-link link ${isActive ? 'header__list-link_active' : ''}`
                }
                to="/movies">
                Фильмы
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink
                className={({ isActive }) =>
                  `header__list-link link ${isActive ? 'header__list-link_active' : ''}`
                }
                to="/saved-movies">
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        )}
        {!isLoggedin && (
          <ul className="header__list header__list_type_authorization">
            <li className="header__list-item">
              <Link className="header__list-link link" to="/signup">
                Регистрация
              </Link>
            </li>
            <li className="header__list-item">
              <Link className="header__list-link header__list-link_type_login button" to="/signin">
                Войти
              </Link>
            </li>
          </ul>
        )}
        {isLoggedin && checkWindowWidth() && (
          <Link className="header__user button" to="/profile">
            Аккаунт
          </Link>
        )}
        {!checkWindowWidth() && isLoggedin && (
          <button onClick={openAsideNav} type="button" className="header__burger button"></button>
        )}
      </nav>
      {!checkWindowWidth() && <Navigation asideNav={asideNav} setAsideNav={setAsideNav} />}
    </header>
  )
}
