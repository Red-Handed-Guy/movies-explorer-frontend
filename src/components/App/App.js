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

const mainPage = (
  <>
    <Header />
    <Main />
    <Footer />
  </>
)
const moviesPage = (
  <>
    <Header />
    <Movies />
    <Footer />
  </>
)
const savedMoviesPage = (
  <>
    <Header />
    <Movies />
    <Footer />
  </>
)

const profilePage = (
  <>
    <Header />
    <Profile />
  </>
)

function App() {
  return (
    <div className="body">
      <div className="page">
        <Routes>
          <Route path="/" element={mainPage} />
          <Route path="/movies" element={moviesPage} />
          <Route path="/saved-movies" element={savedMoviesPage} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={profilePage} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}
export default App
