import React from 'react'

import { Link } from 'react-router-dom'

import headerLogo from '../../img/header/logo.svg'

export default function Register() {
  return (
    <main className="main auth">
      <Link className="auth__logo-link button" to="/">
        <img src={headerLogo} alt="Логотип сайта в виде зеленого бублика" className="auth__logo" />
      </Link>
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form name="register" className="auth__form">
        <ul className="auth__input-list">
          <li className="auth__input-item">
            <p className="auth__input-name">Имя</p>
            <input type="text" className="auth__input" />
            <p className="auth__input-err"></p>
          </li>
          <li className="auth__input-item">
            <p className="auth__input-name">E-mail</p>
            <input type="email" className="auth__input" />
            <p className="auth__input-err"></p>
          </li>
          <li className="auth__input-item">
            <p className="auth__input-name">Пароль</p>
            <input type="password" className="auth__input" />
            <p className="auth__input-err"></p>
          </li>
        </ul>
        <button className="button blue-button auth__submit-button auth__submit-button_type_reg">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__subtitle">
        Уже зарегистрированы?
        <Link className="auth__link link" to="/signin">
          {' '}
          Войти
        </Link>
      </p>
    </main>
  )
}
