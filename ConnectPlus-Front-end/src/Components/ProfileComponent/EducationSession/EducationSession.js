import React from 'react'
import {  AiOutlineEdit } from 'react-icons/ai'
import CompanyLogo from '../../CompanyLogo/CompanyLogo'
import CPIcon from '../../Icon/CPIcon'

function EducationSession() {
  return (
    <div className='mt-2 bg-white border border-zinc-400 rounded-lg shadow-lg px-5 py-5'>
    <div className=' flex justify-between '>
    <h3 className='font-bold text-xl '>Education</h3>
    <span className=' float-right pr-5 '>
<CPIcon tippyPlacement="bottom" tippyContent="Edit ">
<span className='rounded-full'><AiOutlineEdit size={20}/></span>
</CPIcon>
</span>
</div>

{/* company details start */}
<div className='border-b border-t py-2 '>
<div className='mt-2 w-full font-thin '>
<p className='font-semibold capitalize leading-10'> College Name </p>
<p className='font-thin leading-3'>course Name</p>
<p className='font-thin inline leading-3'>starting date</p>&nbsp; to &nbsp; <p className='font-thin inline'>end date date</p>
<p className='font-thin leading-3 '>starting date</p>
</div>
</div>




{/* company details end*/}
</div>
  )
}

export default EducationSession