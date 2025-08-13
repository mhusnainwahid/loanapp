import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const isAdmin = localStorage.getItem('role')
  return (
    (isAdmin === "admin") ? <Outlet/> : <Navigate to = '/'/>
  )
}

export default AdminRoutes
