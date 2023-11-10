import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRouteElementNotLoggedIn = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/" replace />
}
