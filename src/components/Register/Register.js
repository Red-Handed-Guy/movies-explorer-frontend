import React from 'react'
import { validate } from 'email-validator'
import { Link, useNavigate } from 'react-router-dom'
import { register, login } from '../../utils/MainApi'
import { regName } from '../../tools/Const'
import headerLogo from '../../img/header/logo.svg'

export default function Register({ setIsLoggedIn, setCurrentUser }) {
  const [name, setName] = React.useState('')
  const [nameErr, setNameErr] = React.useState('')
  const [nameValid, setNameValid] = React.useState(false)

  const [password, setPassword] = React.useState('')
  const [passwordErr, setPasswordErr] = React.useState('')
  const [passwordValid, setPasswordValid] = React.useState(false)

  const [email, setEmail] = React.useState('')
  const [emailErr, setEmailErr] = React.useState('')
  const [emailValid, setEmailValid] = React.useState(false)
  
  const [isSubmitOk, setIsSubmitOk] = React.useState(false)
  const [isRequestSending, setIsRequestSending] = React.useState(false)
  const [submitErr, setSubmitErr] = React.useState('')

  const navigate = useNavigate()

  function handleChangeName(e) {
    setName(e.target.value)
    setNameValid(regName.test(e.target.value))
    if (e.target.value.length === 1) {
      setNameErr('Текст должен быть не короче 2 симв. Длина текста сейчас: 1 символ.')
    }
    if (e.target.value.length > 1 && !regName.test(e.target.value)) {
      setNameErr(`Поле 'Имя' может содержать только латиницу, кириллицу, пробел или дефис`)
    }

    if (e.target.value.length > 1 && regName.test(e.target.value)) {
      setNameErr('')
    }

    if (e.target.value === '') {
      setNameErr('Заполните это поле')
    }
  }

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
    register({ email, name, password })
      .then(() => {
        setIsSubmitOk(true)
        setSubmitErr('Вы успешно зарегестрировались! Сейчас вы будете автоматически авторизованы.')
        login({ email, password }).then((res) => {
          setSubmitErr('')
          setName('')
          setEmail('')
          setPassword('')
          setIsLoggedIn(true)
          setCurrentUser(res)
          navigate('/movies', { replace: true })
        })
      })
      .catch((err) => {
        setIsSubmitOk(false)
        if (err.includes('409')) {
          setSubmitErr('Пользователь с таким e-mail уже существует')
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

  const submitButtonStatus = nameValid && emailValid && passwordValid

  //! HTML
  return (
    <main className="main auth">
      <Link className="auth__logo-link button" to="/">
        <img src={headerLogo} alt="Логотип сайта в виде зеленого бублика" className="auth__logo" />
      </Link>
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form onSubmit={handleFormSubmit} noValidate name="register" className="auth__form">
        <ul className="auth__input-list">
          <li className="auth__input-item">
            <p className="auth__input-name">Имя</p>
            <input
              onChange={handleChangeName}
              type="text"
              minLength={2}
              maxLength={30}
              required
              placeholder="Имя"
              className="auth__input"
            />
            <p className="auth__input-err">{nameErr}</p>
          </li>
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
        <p
          className={`auth__submit-err auth__submit-err_type_reg ${
            isSubmitOk ? 'auth__submit-err_ok' : ''
          }`}>
          {submitErr}
        </p>
        <button
          disabled={submitButtonStatus && !isRequestSending ? '' : true}
          type="submit"
          className={`button blue-button auth__submit-button ${
            submitButtonStatus && !isRequestSending ? '' : 'blue-button_disabled'
          }`}>
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
