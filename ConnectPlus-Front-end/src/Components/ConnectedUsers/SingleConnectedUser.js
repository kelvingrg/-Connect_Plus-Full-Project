import axios from '../../Config/Axios';
import React from 'react'
import { useSelector } from 'react-redux';
import baseURL from '../../Constants/Constants'
import UserRoundDp from '../PostBox/UserRoundDp.js/UserRoundDp'
import {  useNavigate } from 'react-router-dom';

function SingleConnectedUser({singleUserData}) {
    const {userData}=useSelector(state=>state?.login)
    const navigate=useNavigate();
  
    console.log(singleUserData.userId,"single user data inside single useradyta ");
  return (
    <div className='h-14 mb-2 flex items-center border-b'>
<div className='h-12 w-12'>
    <UserRoundDp image={`${baseURL}/images/dp/${singleUserData?.userId?.dp}`}/>
</div>
<div className='ml-2 flex flex-col items-center' onClick={()=>{
    navigate('/newchat')
    

}
}>
<p className='font-semibold text-base'>{ singleUserData?.userId?.userName}</p>
    <p className='font-thin text-xs'>{singleUserData?.userId?.currentDesignation}</p>

</div>

    </div>
  )
}

export default SingleConnectedUser