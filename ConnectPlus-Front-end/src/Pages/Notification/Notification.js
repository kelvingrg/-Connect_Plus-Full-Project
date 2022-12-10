import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../Components/Navbar/HomeNavbar'
import ProfileBox from '../../Components/ProfileBox/ProfileBox'
import axios from '../../Config/Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SingleNotification from '../../Components/SingleNotification/SingleNotification';
import ConnectedUsers from '../../Components/ConnectedUsers/ConnectedUsers';



function Notification() {
    const {userData}=useSelector(state=>state?.login)
    const[ notificationData, setNotificationData]=useState();


  const navigate=useNavigate()
    const dispatch=useDispatch()




            useEffect(()=>{
                axios.get(`/notifications?userId=${userData._id}`)
                .then((response)=>{
console.log(response,"response of notificatiuon set up ");
if(response?.data?.dataFetched){
  setNotificationData(response?.data?.data)
console.log("ionside data feeteched ");
}
                })
            
                 .catch((error)=>{
                   localStorage.clear()
                           navigate('/')
                 })
                },[userData])
           
console.log(notificationData,"notificationData notificationData" );
    return (<>
          <div className='parent bg-ccLight h-fit min-h-screen '>
            <HomeNavbar/>
            <div className='flex pt-20  px-10 '>
                 {/* left box start  */}
                <div className=' w-1/5 h-auto hidden md:block '>
                    <div className='w-1/5 fixed '>
                        <ProfileBox/>
                    </div>
                </div>
                {/* left box end  */}


<div></div>

                {/* center box start */}
                <div className=' w-full h-auto   md:w-[50%] md:ml-10 space-y-3  '>
                    
        
                <div className=' bg-white   border border-t border-b rounded-b-lg rounded-t-lg shadow-lg border-zinc-400'>
                    <p className=' font-semibold   p-3 broder border-b border-t rounded-t-lg '>Notifications </p>
                  {/*map starts from here   */}
                { notificationData ? notificationData?.notification?.reverse().map((element)=>
  <SingleNotification notificationData={element} />
                ):<div className=' w-full h-fulll flex justify-center items-center'> No notification for you </div>
          }
                      {/*map ends  from here   */}
                </div> 
                </div>

                {/* center box end */}







                 {/* right box start */}
                 <div className=' w-1/5 h-1/2 ml-6 hidden md:block bg-white '>
                 <div className={`w-1/5 h-[85%] fixed border border-zinc-400  overflow-y-scroll scrollbar-hidden shadow-lg rounded-lg o m-2 bg-white pl-`}>
                 <ConnectedUsers/>
                    </div>
                
                </div>
                {/* right box end */}
             </div>
        </div>
 </>)
}

export default Notification

