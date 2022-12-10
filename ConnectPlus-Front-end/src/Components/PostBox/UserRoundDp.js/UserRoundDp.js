import React from 'react'

function UserRoundDp(props) {
  return (
    <div  className='rounded-full h-[100%] w-[100%] bg-blue-300 border bg-cover' >
<img 
src={props.image} 
className='h-full rounded-full'
 alt="" />      
  </div>
  )
}

export default UserRoundDp