import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner';

const AuthGaurd = () => {
    const isAuth = !!localStorage.getItem('token')
  return (
      isAuth ? <Outlet/> : <Navigate to = '/login'/>
  )
}

export default AuthGaurd
