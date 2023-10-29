import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import Register from '../Register/Register'

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
        </Routes>
      </div>
    </div>
  )
}

export default App
