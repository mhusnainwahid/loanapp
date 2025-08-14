import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGaurd = () => {
    const isAuth = !!localStorage.getItem('role')
    const isVerify = localStorage.getItem('isVerify')
  return (
    isAuth ? <Outlet/> : <Navigate to = '/login'/>,
    (isVerify == 'true') ? <Outlet/> : <Navigate to= '/login'/>
  )
}

export default AuthGaurd
