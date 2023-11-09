import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRouteElementNotLoggedIn = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/signin" replace />
}

export const ProtectedRouteElementIsLoggedIn = ({ element, isLoggedIn }) => {
  return !isLoggedIn ? element : <Navigate to="/" replace />
}
