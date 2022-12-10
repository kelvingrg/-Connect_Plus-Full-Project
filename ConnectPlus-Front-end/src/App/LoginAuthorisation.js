import React from 'react'
import {Navigate,Outlet } from 'react-router-dom'

function LoginAuthorisation() {
    const token =localStorage.getItem('token')
    console.log(token ,"token at authorisation file ")
    console.log(token,"token")
    return (
      ( token === "" || token === null || token === undefined) ?
    
      <Outlet/>:<Navigate to="/home"/>
 
    )
  }


export default LoginAuthorisation