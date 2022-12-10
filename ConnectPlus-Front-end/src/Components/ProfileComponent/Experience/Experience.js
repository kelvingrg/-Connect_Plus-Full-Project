import React from 'react'
import {  AiOutlineEdit } from 'react-icons/ai'
import CompanyLogo from '../../CompanyLogo/CompanyLogo'
import CPIcon from '../../Icon/CPIcon'
import { setUserExperienceEditModalState } from '../../../App/ReduxHandlers/ModalSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


function Experience({viewUserData}) {
  const dispatch=useDispatch()
  const {userData}=useSelector((state)=>state?.login)
  return (
    <div className='mt-2 bg-white border border-zinc-400 rounded-lg shadow-lg px-5 py-5'>
    <div className=' flex justify-between '>
    <h3 className='font-bold text-xl '>Experience</h3>
 { !viewUserData &&  <span className=' float-right pr-5 '>
<CPIcon tippyPlacement="bottom" tippyContent="Edit ">
<span className='rounded-full' onClick={()=>dispatch(setUserExperienceEditModalState(true))}><AiOutlineEdit size={20}/></span>
</CPIcon>
</span>}
</div>
{/* company details start */}


{viewUserData ? viewUserData?.experience: userData?.experience.map((element)=><div className='border-b border-t py-2 '>
<div className='mt-2 flex  '>
<CompanyLogo image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk9v6uG9g5AEonjfD_kYL_yoU_H78-w93Vl_SY3USsjtHVT3PXGkEB_oIVAAzb9JiP5A&usqp=CAU"}/>
<div className=' px-10'>
<p className=' font-semibold'>{element.companyName}</p>
      <p className=' font-semibold'>{element.designation}</p>
  <p className='inline font-thin text-sm'>{element.fromDate}</p> -  
 <p className='inline font-thin text-sm'>{element.endDate}</p><br />
 <p className='inline font-thin text-sm'> {element.workLocation}</p>
</div>
</div>
<p>{element.jd}</p>
</div>)}



{/* company details end*/}
</div>
  )
}

export default Experience