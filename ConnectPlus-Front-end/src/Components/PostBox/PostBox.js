import React from 'react'
import { useSelector } from 'react-redux'
import PostBoxInput from './PostBoxInput'
import UserRoundDp from './UserRoundDp.js/UserRoundDp'

function PostBox({jobPost}) {
  const {userData}=useSelector(state=>state.login)
  return (
    
    <div className=" border border-zinc-400  rounded-lg bg-white  p-3 w-full flex items-center justify-center "> 
    <div className='h-14 w-14'>
        <UserRoundDp image={`images/dp/${userData?.dp}`}/>
    </div>

    <div className='grow ml-5 '> <PostBoxInput jobPost={jobPost}/> </div>
    </div>
  )
}

export default PostBox