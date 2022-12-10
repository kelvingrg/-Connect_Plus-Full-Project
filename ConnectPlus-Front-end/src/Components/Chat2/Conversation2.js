
import axios from '../../Config/Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserRoundDp from '../PostBox/UserRoundDp.js/UserRoundDp';
import baseURL from '../../Constants/Constants';


function Conversation2({data, currentUserId, online}) {
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
  return (<>
  
  <div className=' flex mt-2 px-1 '>           
<div className='h-12 w-12  '>
    <div className=' h-12 w-12'>
    <UserRoundDp image={secUserData?.dp? `${baseURL}/images/dp/${secUserData?.dp}`:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
/>
    </div>

</div> 
<div className=' ml-2 bg-gray-100 w-full pt-1 px-3 rounded-lg  '>

{online && <div className='  rounded-full  w-3 h-3 bottom-2  left-[1.1rem] bg-green-500 float-right mt-3'> </div>}
 <p className="text-lg font-semibold leading-[1.2rem]">{secUserData?.userName}</p>
 <p className=" text-sm font-thin leading-[0.8rem] italic">{secUserData?.currentDesignation} </p>

</div>
</div>













  </>
    
       

  )
}

export default Conversation2