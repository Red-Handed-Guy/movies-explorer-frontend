import React from 'react'
import { useNavigate } from 'react-router-dom'
import { validate } from 'email-validator'

import { regName } from '../../tools/Const'
import { CurrentUserContext } from '../Context/Context'
import { logout, patchUser } from '../../utils/MainApi'

export default function Profile({ setIsLoggedIn, setCurrentUser }) {
  const currentUser = React.useContext(CurrentUserContext)

  const [name, setName] = React.useState(currentUser.name)
  const [nameErr, setNameErr] = React.useState('')
  const [nameValid, setNameValid] = React.useState(true)

  const [email, setEmail] = React.useState(currentUser.email)
  const [emailErr, setEmailErr] = React.useState('')
  const [emailValid, setEmailValid] = React.useState(true)

  const [submitErr, setSubmitErr] = React.useState('')
  const [isEditing, setIsEditing] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  }, [currentUser])

  function handleLogout() {
    logout()
      .then(() => {
        setCurrentUser({})
        setIsLoggedIn(false)
        navigate('/', { replace: true })
      })
      .catch((err) => console.log(err))
  }

  function handleEdit() {
    setIsEditing(true)
  }

  function handleChangeName(e) {
    setName(e.target.value)
    setNameValid(regName.test(e.target.value))
    if (e.target.value.length === 1) {
      setNameErr('Имя должно быть не короче 2 символов')
    }
    if (e.target.value.length > 1 && !regName.test(e.target.value)) {
      setNameErr(`Поле 'Имя' может содержать только латиницу, кириллицу, пробел или дефис`)
    }

    if (e.target.value.length > 1 && regName.test(e.target.value)) {
      setNameErr('')
    }

    if (e.target.value === '') {
      setNameErr(`Заполните поле 'Имя'`)
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
      setEmailErr('Заполните поле E-mail')
    }
  }

  function submitForm(e) {
    e.preventDefault()
    patchUser({ name, email })
      .then((res) => {
        setCurrentUser(res)
        setSubmitErr('')
        setIsEditing(false)
        
      })
      .catch((err) => {
        if (err.includes('409')) {
          setSubmitErr('Пользователь с таким E-mail уже существует')
        } else {
          setSubmitErr('Что-то пошло не так')
        }
      })
  }

  const submitButtonStatus = nameValid && emailValid

  return (
    <main className="main profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form noValidate onSubmit={submitForm} className="profile__form">
          <ul className="profile__info">
            <li className="profile__item">
              <p className="profile__item-text">Имя</p>
              {isEditing ? (
                <input
                  minLength={2}
                  maxLength={30}
                  required
                  onChange={handleChangeName}
                  className="profile__input"
                  type="text"
                  placeholder="Имя"
                  value={name}
                />
              ) : (
                <p className="profile__item-text">{currentUser.name}</p>
              )}
            </li>
            <li className="profile__item">
              <p className="profile__item-text">E-mail</p>
              {isEditing ? (
                <input
                  required
                  onInput={handleChangeEmail}
                  className="profile__input"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                />
              ) : (
                <p className="profile__item-text">{currentUser.email}</p>
              )}
            </li>
          </ul>
          {isEditing && (
            <div className="profile__submit-button-wrapper">
              <p className="profile__form-err">
                {submitErr}
                <>{nameErr}</>
                <br />
                <>{emailErr}</>
              </p>
              <button
                disabled={submitButtonStatus ? '' : true}
                type="submit"
                className={`button blue-button profile__submit-button ${
                  submitButtonStatus ? '' : 'blue-button_disabled'
                }`}>
                Сохранить
              </button>
            </div>
          )}
        </form>
      </div>
      {!isEditing && (
        <div className="profile__buttons-wrapper">
          <button type="button" onClick={handleEdit} className="profile__button link">
            Редактировать
          </button>
          <button
            onClick={handleLogout}
            type="button"
            className="profile__button link profile__button_color_pink">
            Выйти из аккаунта
          </button>
        </div>
      )}
    </main>
  )
}
