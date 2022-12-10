import axios from '../../Config/Axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SingleConnectedUser from './SingleConnectedUser'


function ConnectedUsers() {
    const {userData}=useSelector(state=>state.login)
    const navigate=useNavigate()
    const[connetedUsers ,setConnectedUsers]=useState();
    useEffect(()=>{
        axios.get(`/connectedUsersData?userId=${userData._id}`)
        .then(response=>{
            console.log(response?.data?.data?.connections,"***********************response of conncetd users data fetch");
            if(response?.data?.dataFetched){
                setConnectedUsers(response?.data?.data?.connections)
            }
            if(response?.data?.loadError){
              navigate('/page404')
            }
          
          })
          .catch((error)=>{
            localStorage.clear()
                    // navigate('/')
          })
    },[])
    console.log()
  return (
    <div className='py-2 '>
{ connetedUsers?  connetedUsers?.map((element)=><SingleConnectedUser singleUserData={element} />):<div className='w-full h-full flex justify-center items-stretch'>No Connectiuons available</div> }
    </div>

  )
}

export default ConnectedUsers