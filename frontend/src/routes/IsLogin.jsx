import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const IsLogin = () => {
    const isLogin = !!localStorage.getItem('role')
  return (
    isLogin ? <Navigate to = '/'/> : <Outlet/> 
  )
}

export default IsLogin
