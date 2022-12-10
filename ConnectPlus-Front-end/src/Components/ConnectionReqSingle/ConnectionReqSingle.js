import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import baseURL from '../../Constants/Constants'
import { CButton } from '../Button/CButton'
import UserRoundDp from '../PostBox/UserRoundDp.js/UserRoundDp'
import TimeagoDate from '../TimeagoDate/TimeagoDate'
import axios from '../../Config/Axios'
import { useNavigate } from 'react-router-dom'


function ConnectionReqSingle({data}) {
  // incomminf data = {
  //                  userId: {
  //                    _id: new ObjectId("6388261a739403a46874f5fd"),
  //                    userName: 'Sherooq  Muhammed ',
  //                    currentDesignation: 'Software Devoloper ',
  //                    keyrole: [Array]
  //                  },
  //                  timeStamp: 2022-12-01T03:34:17.744Z,
  //                  _id: new ObjectId("63882646739403a46874f617")
  const [accept, setAccept]=useState(false)
  const [decline,setDecline]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {userData}=useSelector(state=>state?.login)
  const handleAcceptReq=()=>{
    setAccept(true)
    console.log(userData._id ,data?.userId?._id," axios passing data whiel aaccpting ")
    axios.post('/acceptConnectionReq',{userId:userData._id ,reqUser:data?.userId?._id})
    .then((response)=>{
        console.log(response,"iresponse ofgetConnectionSuggestionData ")
        if (response ?. data ?. loadError) {
            navigate('/page404')
        }
        if (response ?. data ?. update) {

        }
      
       })
       .catch((error)=>{
         localStorage.clear()
                 navigate('/')
       })
  }

  const handleDeclineReq=()=>{
    setDecline(true)
    axios.post('/declineConnectionReq',{userId:userData._id ,reqUser:data?.userId?._id})
    .then((response)=>{
      console.log(response,"iresponse ofgetConnectionSuggestionData ")
      if (response ?. data ?. loadError) {
          navigate('/page404')
      }
      if (response ?. data ?. update) {

      }
    
     })
     .catch((error)=>{
       localStorage.clear()
               navigate('/')
     })
  }
                  
  return (
!decline &&  <div className='w-full px-7 py-3 border border-b flex justify-between '>
                        <div className='w-14 h-14 flex'>
                        <UserRoundDp image={`${baseURL}/images/dp/${data?.userId?.dp}`}/>
                     
                        </div>
                        <div className=' grow pl-5 pt-1 '>

                            <p className=' font-semibold leading-3'>{data?.userId?.userName} </p>
                            <p className=' font-light '> {data?.userId?.currentDesignation} </p>
                            <p className=' font-light italic leading-3'> <TimeagoDate timeStamp={data.timeStamp}/> </p>
                        </div>
                        <div className='px-5 space-x-4 flex items-center justify-around'>{!accept &&<span className='text-sm md:mr-2 cursor-pointer active:scale-110 active:bg-ccOrange rounded-full px-1' onClick={handleDeclineReq}> Decline </span>}   <span onClick={ !accept && handleAcceptReq} > <CButton text={ accept ? "accepted ":"Accept"}/></span> </div>

                    </div>
  )
}

export default ConnectionReqSingle