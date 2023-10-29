import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Movies from '../Movies/Movies'



const mainPage = <><Header /><Main /><Footer /></>;
const moviesPage = <><Header /><Movies /><Footer /></>;
const savedMoviesPage = <><Header /><Movies /><Footer /></>;

function App() {
  return (
    <div className="body">
      <div className="page">
        <Routes>
          <Route path="/" element={mainPage} />
          <Route path="/movies" element={moviesPage} />
          <Route path="/saved-movies" element={savedMoviesPage} />
        </Routes>
      </div>
    </div>
  )
}

export default App
