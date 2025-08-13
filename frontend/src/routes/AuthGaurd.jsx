import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGaurd = () => {
    const isAuth = !!localStorage.getItem('role')
  return (
    isAuth ? <Outlet/> : <Navigate to = '/login'/>
  )
}

export default AuthGaurd
