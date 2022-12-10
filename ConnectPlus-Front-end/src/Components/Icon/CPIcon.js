import React from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 

function CPIcon({children,tippyPlacement,tippyContent ,tooltip}) {
  return (
   {tooltip}? <Tippy placement={tippyPlacement} content={tippyContent}>
    <button className='hover:scale-110 rounded-full'>{children}</button>
    </Tippy>: 
    <button className='hover:scale-110 rounded-full'>{children}</button> )
}

export default CPIcon