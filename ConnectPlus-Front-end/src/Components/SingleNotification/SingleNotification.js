import React, { useState } from 'react'
import { useEffect } from 'react'
import TimeagoDate from '../TimeagoDate/TimeagoDate'
import { CButton } from '../Button/CButton'
import UserRoundDp from '../PostBox/UserRoundDp.js/UserRoundDp'

function SingleNotification({notificationData}) {
  const [content, setContent]=useState('');
  let {userName}=notificationData.respectedUserId
  useEffect(()=>{
   

    if (notificationData.notificationType==='like')
    setContent(userName+ "  liked your post" )
    else if(notificationData.notificationType==="comment")
    setContent(userName+ "  added a  new comment on your post  " )
    else if(notificationData.notificationType==="jobApplied")
    setContent(userName+ " responded to your job post    " )
    else if(notificationData.notificationType==="connectionReq")
    setContent(userName+ " has interested to conncet with you      " )
    else if(notificationData.notificationType==="connectionAccept")
    setContent(userName+ " is accpeted your request       " )
  },[])

  return (
    <div className={`bg-ccLight h-12 w-full flex  items-center mb-1`}>
      {/* <div className='h-12 w-12 ml-5 '>
      <UserRoundDp image=''/>
 
      </div> */}
    
      <p className='ml-5'> {content} </p>
      
      <div className=' grow flex justify-end mr-10'>
      <p className='ml-5  font-thin italic text-xs'><TimeagoDate timeStamp={notificationData.timeStamp} />  </p>
      {/* <CButton text={"view Post"}/>  */}
      </div>
          
    </div>
  )
}

export default SingleNotification