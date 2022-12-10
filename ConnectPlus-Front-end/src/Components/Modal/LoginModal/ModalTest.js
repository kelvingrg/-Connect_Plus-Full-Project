import React, { useEffect, useState } from 'react'
import { CButton } from '../../Button/CButton'
import './LoginModal.css'
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModal } from '../../../App/ReduxHandlers/ModalSlice';
import { setsignupModal,setForgotPassWordModalState } from '../../../App/ReduxHandlers/ModalSlice';
import { loginUser, setPassword,setUserName } from '../../../App/ReduxHandlers/LoginReducer';
import { useNavigate } from 'react-router-dom';




function ModalTest() {

  const navigate=useNavigate()

  const {email, password,invalidCred,userLogin}=useSelector((state)=>state?.login)

  const dispatch=useDispatch()
  const handleSubmit=(e)=>{
e.preventDefault()
console.log(email,password,"username and password")
return new Promise((resolve,reject )=>{
  dispatch(loginUser({email, password}))
  if(userLogin){
    navigate("/home")
  }
}
)

  }
 
  return (
    <div className='ModalTest absolute flex justify-center items-center h-screen w-screen z-30 overflow-visible border ' >

      <div className='md:w-1/4 w-full m-5 md:m-0 bg bg-white h-auto rounded-lg shadow-lg ' onClick={(e)=>{ e.stopPropagation()}}>
        <HiXMark className='float-right mt-3 mr-3 hover:text-ccOrange hover:stroke-2 hover:scale-150'  onClick={(e=>
     dispatch(setLoginModal(false)))} />
        <br />
      <h1 className='text-center text-lg mt-5 font-bold'>Login</h1><br />
      <div className=' w-[90%] m-5  '>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username" className=' '>User Name : </label><br />
      <input type="text" className='border border-black w-full my-3 h-10 rounded-lg pl-4' name="email" placeholder='Enter your Eamil ..' value={email} onChange={(e)=> dispatch(setUserName(e.target.value))} />
      <label htmlFor="username" className=' '>PassWord : </label><br />
      <input type="password" className='border  border-black w-full my-3 h-10 rounded-lg pl-4'  name="password" placeholder='Enter your Password ..' value={password} onChange={(e)=> dispatch(setPassword(e.target.value))}/>
     {invalidCred &&<p className='text-red-600'> invalid credentials 
     </p>}
     <p className=' font-thin italic text-blue-400 underline'><a onClick={()=>{
     dispatch(setLoginModal(false))
    return dispatch(setForgotPassWordModalState(true))
   } }
     
     
     >forgot Password ?</a></p>
      <div className='w-full flex  justify-center items-center mt-5 '>
     
<CButton text={'Login'}/>


      </div >
      </form>
      <p className='font-thin mt-4'>dont have an acoount ? <a href="" className='italic text-blue-400 underline' 
      onClick={(e)=>{e.preventDefault()
      return dispatch(setsignupModal(true))}}>signup here</a></p>
      </div>
      </div>
    </div>
  )
}

export default ModalTest