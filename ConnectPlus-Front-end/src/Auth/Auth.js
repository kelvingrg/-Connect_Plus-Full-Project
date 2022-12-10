import React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router-dom'

function Auth() {
  const token =localStorage.getItem("token")
  
  return (
    token
    ?<Outlet/>
    :<Navigate to="/" />
  )
}

export default Auth