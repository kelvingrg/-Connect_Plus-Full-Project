import React from 'react'

export const CButton = ({children,text}) => {
  return (
    <button className=' box-border rounded-full px-4 py-1 border-ccOrange text-black active:bg-ccOrange border-2 active:border-black  text-sm font-medium flex items-center space-x-2 justify-center capitalize'>{text && <span>{text}</span>}<span className='flex items-center mt-1 '>{children}</span>  </button>
  )
}
