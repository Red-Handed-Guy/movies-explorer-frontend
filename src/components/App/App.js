import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFound from '../NotFound/NotFound'
import Profile from '../Profile/Profile'
import { getMovies } from '../../utils/MoviesApi'

import {
  ProtectedRouteElementNotLoggedIn,
  ProtectedRouteElementIsLoggedIn,
} from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../Context/Context'

import { getUser } from '../../utils/MainApi'

function App() {
  const [windowWidth, setWindowWidth] = React.useState(document.documentElement.clientWidth)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentUser, setCurrentUser] = React.useState({})
  const [movies, setMovies] = React.useState([])

  React.useEffect(() => {
    setIsLoading(true)
    getUser()
      .then((res) => {
        setIsLoggedIn(true)
        setIsLoading(false)
        setCurrentUser(res)
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }, [])

  React.useEffect(() => {
    if (isLoggedIn) {
      getMovies()
        .then((res) => {
          setMovies(res)
        })
        .catch(console.log)
    }
  }, [isLoggedIn])

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(document.documentElement.clientWidth)
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const headerComponent = <Header windowWidth={windowWidth} isLoggedIn={isLoggedIn} />
  const profileComponent = <Profile setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />
  const loginComponent = (
    <Login
      setIsLoggedIn={setIsLoggedIn}
      setCurrentUser={setCurrentUser}
      setIsLoading={setIsLoading}
    />
  )
  const moviesComponent = <Movies movies={movies} />

  const mainPage = (
    <>
      {headerComponent}
      <Main />
      <Footer />
    </>
  )
  const moviesPage = (
    <>
      {headerComponent}
      {moviesComponent}
      <Footer />
    </>
  )
  const savedMoviesPage = (
    <>
      {headerComponent}
      {moviesComponent}
      <Footer />
    </>
  )

  const profilePage = (
    <>
      {headerComponent}
      {profileComponent}
    </>
  )

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Routes>
            <Route path="/" element={mainPage} />
            {!isLoading && (
              <Route
                path="/movies"
                element={
                  <ProtectedRouteElementNotLoggedIn element={moviesPage} isLoggedIn={isLoggedIn} />
                }
              />
            )}
            {!isLoading && (
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRouteElementNotLoggedIn
                    element={savedMoviesPage}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
            )}
            {!isLoading && (
              <Route
                path="/signin"
                element={
                  <ProtectedRouteElementIsLoggedIn
                    element={loginComponent}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
            )}
            {!isLoading && (
              <Route
                path="/signup"
                element={
                  <ProtectedRouteElementIsLoggedIn element={<Register />} isLoggedIn={isLoggedIn} />
                }
              />
            )}
            {!isLoading && (
              <Route
                path="/profile"
                element={
                  <ProtectedRouteElementNotLoggedIn element={profilePage} isLoggedIn={isLoggedIn} />
                }
              />
            )}
            {!isLoading && <Route path="*" element={<NotFound />} />}
            {isLoading && <Route path="*" element={<></>} />}
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}
export default App
