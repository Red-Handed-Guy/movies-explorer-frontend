import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import headerLogo from '../../img/header/logo.svg'

const isLoggedin = true

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__logo-link button" to="/">
          <img className="header__logo" src={headerLogo} alt="Логотип приложения" />
        </Link>
        {isLoggedin && (
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
        {isLoggedin && (
          <Link className="header__user button" to="/profile">
            Аккаунт
          </Link>
        )}
      </nav>
    </header>
  )
}
