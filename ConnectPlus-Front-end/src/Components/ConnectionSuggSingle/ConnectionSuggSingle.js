import React, { useState } from 'react'
import { CButton } from '../Button/CButton'
import UserRoundDp from '../PostBox/UserRoundDp.js/UserRoundDp'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import baseURL from '../../Constants/Constants';
import axios from '../../Config/Axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



function ConnectionSuggSingle({data}) {
  const[reqSend,setReqSend]=useState(false)
  const navigate=useNavigate()
  const {userData}=useSelector(state=>state.login)
  
  const handleReq=()=>{
  setReqSend(true)
axios.post('/sendConnectionReq',{userId:userData._id,reqUserId:data._id})
.then((response)=>{
console.log(response,"iresponse ofgetConnectionSuggestionData ")
if (response ?. data ?. loadError) {
navigate('/page404')
}
if (response ?. data ?. update) {
console.log(response,"iresponse of own jiob post data ")

}

}) .catch((error)=>{
  //    localStorage.clear()
  //            navigate('/')
  })
    }





  return (
    <Card className="w-52 h-72 rounded-lg shadow-lg border mb-3" onClick={()=>{
    
    //    navigate(`/detailedJobPostView/${data._id}`, { state: data  });
      }}>
  
      
      
        <div className='flex flex-col items-center justify-center '>
            <div className='w-20 h-20  mt-5 mb-3 '> 
       <UserRoundDp image={`${baseURL}/images/dp/${data?.dp}`} /> </div>
          <div className='pl-2 w-full flex flex-col justify-center items-center'>
  <p className='bold text-black font-bold text-lg capitalize'>{data.userName} </p>
  <p className='bold text-black  font-semibold capitalize'> {data.currentDesignation} </p>
  <p className='bold text-black  font-light text-sm capitalize text-center px-1 '> {data?.keyrole?.map((element)=>element+ " ||")} </p>
          </div>
          </div> 
  
        
     <div className='px-5 h-72 text-sm'>
    

  
     </div>
       
        <CardFooter divider className=" py-2">
         
          <Typography variant="small" color="gray" className="flex items-center justify-center" onClick={handleReq} > <CButton text={reqSend?" Request Send":"Connect"}/>
  
      
          </Typography>
        </CardFooter>
      </Card>
  )
}

export default ConnectionSuggSingle