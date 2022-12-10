import React from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import { HiXMark } from "react-icons/hi2";


function CloseButton(props) {
  return (
    <Tippy placement='top' content="Close">
      <button className=' rounded-full p-1 hover:bg-ccBlack bg-opacity-50  hover:text-ccOrange  '> <HiXMark className=' hover:text-ccOrange'/></button>
      </Tippy>
  )
}

export default CloseButton