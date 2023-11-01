import React from 'react'
import { useNavigate } from 'react-router-dom'
const userDefault = {
  name: 'Олег',
  email: 'Oleg@verni.dengi',
}

export default function Profile() {
  const [user, setUser] = React.useState(userDefault)
  const [name, setName] = React.useState(user.name)
  const [email, setEmail] = React.useState(user.email)
  const [isEditing, setIsEditing] = React.useState(false)

  const navigate = useNavigate()

  function logOut() {
    navigate('/')
  }

  function handleEdit() {
    setIsEditing(true)
  }

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function submitForm(e) {
    e.preventDefault()
    setUser({
      name: name,
      email: email,
    })
    setIsEditing(false)
  }

  return (
    <main className="main profile">
      <div className='profile__wrapper'>
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form onSubmit={submitForm} className="profile__form">
          <ul className="profile__info">
            <li className="profile__item">
              <p className="profile__item-text">Имя</p>
              {isEditing ? (
                <input
                  onInput={handleChangeName}
                  className="profile__input"
                  type="text"
                  value={name}
                />
              ) : (
                <p className="profile__item-text">{user.name}</p>
              )}
            </li>
            <li className="profile__item">
              <p className="profile__item-text">E-mail</p>
              {isEditing ? (
                <input
                  onInput={handleChangeEmail}
                  className="profile__input"
                  type="email"
                  value={email}
                />
              ) : (
                <p className="profile__item-text">{user.email}</p>
              )}
            </li>
          </ul>
          {isEditing && (
            <div className="profile__submit-button-wrapper">
              <p className="profile__form-err">Lorem ipsum dolor sit amet.</p>
              <button type="submit" className="profile__submit-button blue-button button">
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
            onClick={logOut}
            type="button"
            className="profile__button link profile__button_color_pink">
            Выйти из аккаунта
          </button>
        </div>
      )}
    </main>
  )
}
