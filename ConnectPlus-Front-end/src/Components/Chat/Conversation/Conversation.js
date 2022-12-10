
import axios from '../../../Config/Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import baseURL from '../../../Constants/Constants';

function ConverSation({data, currentUserId, online}) {
    const [secUserData, setSecUserData]=useState(null)
    const navigate=useNavigate();
    useEffect(()=>{
        console.log(data,currentUserId,"data,currentUserId in conversation ----3");
        const userId=data.members.find((id)=>id!==currentUserId)
        console.log(userId,"userId of ther user in conversation ----4");
    
            try{
                const getUserData=async()=>{
                const {data}=await axios.post('/getUserData',{userId:userId})
                console.log(data.response[0],"data..response[0] at conversation -getuserdata fn ----5 ");
                setSecUserData(data.response[0])
                }
             getUserData();
            }
            catch(err){
                console.log(err);
                navigate('/page404')
            }
        

    },[])
  return (
        <>
    <div className='follower conversation'>
      {online &&   <div className='online-dot'> 
        
        </div>}
        <img src={secUserData?.dp? `${baseURL}/images/dp/${secUserData?.dp}`:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt=""
        className='followerImage'
        style={{width:'3rem',height:'3rem'}}
        />
        <div className="name" style={{fontSize:'0.8rem'}}>

    <span>{secUserData?.userName}</span>
    {/* <span>Online</span> */}
        </div>
    </div>
    <hr style={{width:'85%',border:'0.1px solid #ececec'}} />
    </>
  )
}

export default ConverSation