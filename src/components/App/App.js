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

import { ProtectedRouteElementNotLoggedIn } from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../Context/Context'
import { getUser } from '../../utils/MainApi'

function App() {
  const [windowWidth, setWindowWidth] = React.useState(document.documentElement.clientWidth)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentUser, setCurrentUser] = React.useState({})
  
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
    function handleWindowResizeTimeout() {
      setTimeout(() => {
        setWindowWidth(document.documentElement.clientWidth)
      }, '500')
    }

    window.addEventListener('resize', handleWindowResizeTimeout)
    return () => {
      window.removeEventListener('resize', handleWindowResizeTimeout)
    }
  }, [])

  const headerComponent = <Header windowWidth={windowWidth} isLoggedIn={isLoggedIn} />
  const profileComponent = <Profile setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />
  const loginComponent = <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
  const registerComponenet = (
    <Register setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
  )
  const moviesComponent = <Movies windowWidth={windowWidth} />

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
            {!isLoading && (
              <>
                <Route path="/" element={mainPage} />
                {
                  <Route
                    path="/movies"
                    element={
                      <ProtectedRouteElementNotLoggedIn
                        element={moviesPage}
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />
                }
                {
                  <Route
                    path="/saved-movies"
                    element={
                      <ProtectedRouteElementNotLoggedIn
                        element={savedMoviesPage}
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />
                }

                {!isLoggedIn && <Route path="/signin" element={loginComponent} />}
                {!isLoggedIn && <Route path="/signup" element={registerComponenet} />}
                {
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRouteElementNotLoggedIn
                        element={profilePage}
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />
                }
                {<Route path="*" element={<NotFound />} />}
              </>
            )}

            {isLoading && <Route path="*" element={<></>} />}
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}
export default App
