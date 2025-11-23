import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
 
  return localStorage.getItem("adminValid") ? children : <Navigate to="/adminlogin" />
}

export default PrivateRoute
