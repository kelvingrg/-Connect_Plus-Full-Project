import React from 'react'
import { TbCameraPlus } from "react-icons/tb";
import CPIcon from '../Icon/CPIcon';


function CoverPhoto(props) {
  return (
    <>   
     <img src={props.image} alt="" className='relative h-full w-full object-cover' />
<div className='absolute bg-ccLight rounded-full w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 right-10 top-5'>
<CPIcon tippyPlacement="top" tippyContent="Upload Cover Photo">
<span className='rounded-full'><TbCameraPlus size={20}/></span>
</CPIcon>
</div>

  </>


  )
}

export default CoverPhoto