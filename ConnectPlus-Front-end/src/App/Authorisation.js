import React from 'react'
import {Navigate,Outlet } from 'react-router-dom'

function Authorisation() {
  const token =localStorage.getItem('token')
  console.log(token ,"token at authorisation file ")
  console.log(token,"token")
  return (
  token?<Outlet/>:<Navigate to="/"/>
  )
}

export default Authorisation