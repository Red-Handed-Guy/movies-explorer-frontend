import React from 'react'
import { validate } from 'email-validator'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../utils/MainApi'
import headerLogo from '../../img/header/logo.svg'

export default function Login({ setCurrentUser, setIsLoggedIn }) {
  const [password, setPassword] = React.useState('')
  const [passwordErr, setPasswordErr] = React.useState('')
  const [passwordValid, setPasswordValid] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [emailErr, setEmailErr] = React.useState('')
  const [emailValid, setEmailValid] = React.useState(false)
  const [submitErr, setSubmitErr] = React.useState('')
  const [isRequestSending, setIsRequestSending] = React.useState(false)

  const navigate = useNavigate()

  function handleChangeEmail(e) {
    setEmail(e.target.value)
    setEmailValid(validate(e.target.value))
    if (!validate(e.target.value)) {
      setEmailErr('Невалидный E-mail')
    } else {
      setEmailErr('')
    }
    if (e.target.value === '') {
      setEmailErr('Заполните это поле')
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
    setPasswordErr(e.target.validationMessage)
    setPasswordValid(e.target.validity.valid)
    if (e.target.value === '') {
      setPasswordErr('Заполните это поле')
    }
  }

  //! Кнопка сабмит
  function handleFormSubmit(e) {
    e.preventDefault()
    setIsRequestSending(true)
    login({ email, password })
      .then((res) => {
        setSubmitErr('')
        setEmail('')
        setPassword('')
        setIsLoggedIn(true)
        setCurrentUser(res)
        navigate('/movies', { replace: true })
      })
      .catch((err) => {
        if (err.includes('401')) {
          setSubmitErr('Введены неверный логин или пароль')
        } else {
          setSubmitErr('Что-то пошло не так')
        }
        setTimeout(() => {
          setSubmitErr('')
        }, 3000)
      })
      .finally(() => {
        setIsRequestSending(false)
      })
  }

  const submitButtonStatus = emailValid && passwordValid

  return (
    <main className="main auth">
      <Link className="auth__logo-link button" to="/">
        <img src={headerLogo} alt="Логотип сайта в виде зеленого бублика" className="auth__logo" />
      </Link>
      <h1 className="auth__title">Рады видеть!</h1>
      <form onSubmit={handleFormSubmit} noValidate name="login" className="auth__form">
        <ul className="auth__input-list">
          <li className="auth__input-item">
            <p className="auth__input-name">E-mail</p>
            <input
              onChange={handleChangeEmail}
              type="email"
              required
              placeholder="E-mail"
              className="auth__input"
            />
            <p className="auth__input-err">{emailErr}</p>
          </li>
          <li className="auth__input-item">
            <p className="auth__input-name">Пароль</p>
            <input
              onChange={handleChangePassword}
              type="password"
              minLength={2}
              maxLength={30}
              required
              placeholder="Пароль"
              className="auth__input"
            />
            <p className="auth__input-err">{passwordErr}</p>
          </li>
        </ul>
        <p className={`auth__submit-err auth__submit-err_type_reg`}>{submitErr}</p>
        <button
          disabled={submitButtonStatus && !isRequestSending ? '' : true}
          type="submit"
          className={`button blue-button auth__submit-button ${
            submitButtonStatus && !isRequestSending ? '' : 'blue-button_disabled'
          }`}>
          Войти
        </button>
      </form>
      <p className="auth__subtitle">
        Ещё не зарегистрированы?
        <Link className="auth__link link" to="/signup">
          {' '}
          Регистрация
        </Link>
      </p>
    </main>
  )
}
