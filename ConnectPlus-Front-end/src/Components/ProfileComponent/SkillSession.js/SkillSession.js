import React, { useEffect } from 'react'
import {  AiOutlineEdit } from 'react-icons/ai'
import CompanyLogo from '../../CompanyLogo/CompanyLogo'
import CPIcon from '../../Icon/CPIcon'
import { BiRightArrow } from "react-icons/bi";
import SkillProgressBar from '../SkillProgressBar/SkillProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSkillUpdateModalState } from '../../../App/ReduxHandlers/ModalSlice';

function SkillSession({viewUserData})  {
  const {userData}=useSelector((state)=>state?.login)
  useEffect(()=>{},[userData])
  const dispatch=useDispatch()
    return (
      <div className='mt-2 bg-white border border-zinc-400 rounded-lg shadow-lg px-5 py-5'>
      {/* skillset hrading box start */}
      <div className=' flex justify-between '>
      <h3 className='font-bold text-xl '>Skills</h3>
      {!viewUserData && <span className=' float-right pr-5 '>
  <CPIcon tippyPlacement="bottom" tippyContent="Edit ">
  <span className='rounded-full' onClick={()=>dispatch(setUserSkillUpdateModalState(true))}><AiOutlineEdit size={20}/></span>
  </CPIcon>
  </span>}
  </div>
   {/* skillset hrading box end  */}

  {/* skill set start */}
  
  <div className=' border-b border-t py-2'>
{/* map will write here */}

{viewUserData ? viewUserData?.skills: userData?.skills?.map((element)=>
    <div className='flex items-center justify-between w-full '>
<div className='flex items-center'><BiRightArrow size={15}/> &nbsp;<p>  {element.skillName}</p> </div>
<div className='w-[80%] px-auto ml-10 '><SkillProgressBar progress={element.percentage}/>
</div>
</div>)}
{/* map will end  here */}

  </div>

  
  
  {/* skill set end*/}
  </div>
    )
  }

export default SkillSession