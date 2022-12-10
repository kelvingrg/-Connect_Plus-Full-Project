import React from 'react'
import {  AiOutlineEdit } from 'react-icons/ai'
import CPIcon from '../../Icon/CPIcon'
import { setUserAboutSessionModalState } from '../../../App/ReduxHandlers/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteLoaderData } from 'react-router-dom'



function AboutUser({viewUserData}) {
  const dispatch=useDispatch();
  const {userData}=useSelector((state)=>state?.login)
  return (
    <div className='mt-2 bg-white border border-zinc-400 rounded-lg shadow-lg px-5 py-5 '>
        <div className=' flex justify-between'>
        <h3 className='font-bold text-xl '>About</h3>
       { !viewUserData && <span className=' float-right pr-5 '>
<CPIcon tippyPlacement="bottom" tippyContent="Edit ">
<span className='rounded-full' onClick={()=>dispatch(setUserAboutSessionModalState(true))}><AiOutlineEdit size={20}/></span>
</CPIcon>
  </span>}
  </div>
{viewUserData ? viewUserData?.about: userData.about}
    </div>
  )
}

export default AboutUser