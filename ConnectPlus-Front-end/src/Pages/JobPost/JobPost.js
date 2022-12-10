import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../Components/Navbar/HomeNavbar'
import ProfileBox from '../../Components/ProfileBox/ProfileBox'
import AddJobClickBox from '../../Components/AddJobClickBox/AddJobClickBox'
import OwnJobPost from '../../Components/OwnJobPost/OwnJobPost'

import axios from '../../Config/Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AppliedCandidates from '../../Components/AppliedCandidates/AppliedCandidates'
import { setAllJobPostData, setSingleJobPostData } from '../../App/ReduxHandlers/TempDataReducer'



function Job() {
    const {singleJobPostData,allJobPostData}=useSelector((state)=>state.tempData)
    const {userData}=useSelector(state=>state?.login)
    const {overFlow}=useSelector(state=>state?.tempData)
  const navigate=useNavigate()
    const dispatch=useDispatch()

   
    useEffect(()=>{
        axios.get(`/ownJobPostData?userId=${userData._id}`)
        .then((response)=>{
          console.log(response,"iresponse of own jiob post data ")
          if (response ?. data ?. loadError) {
              navigate('/page404')
          }
          if (response ?. data ?. dataFetched) {
              console.log(response,"iresponse of own jiob post data ")
              dispatch(setAllJobPostData(response?.data?.data))
            //  dispatch(setSingleJobPostData(response?.data?.data[0]))
              
              console.log(response);
          }
        
         })
         .catch((error)=>{
           localStorage.clear()
                   navigate('/')
         })
        
            },[ ])
           

        
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

                {/* center box start */}
                <div className=' w-full  h-auto bg-white border rounded-lg shadow-lg border-zinc-400 md:w-[50%] md:ml-10 p-3 min-h-screen '>
       
               <AddJobClickBox/>

            {allJobPostData ? allJobPostData?.map(element=> <OwnJobPost singleJobPostData={element} /> ):"No Job Post "      }
                </div>

                {/* center box end */}

                 {/* right box start */}
                 <div className=' w-1/5 h-1/2 ml-6 hidden md:block bg-white'>
                 <div className={`w-1/5 h-[85%] fixed border border-ccBlack  scrollbar-hidden shadow-lg rounded-lg o m-2  ${overFlow?"overflow-x-scroll":"overflow-x-scroll"}`}>
                <AppliedCandidates />               
                    </div>
                    <div></div>
                </div>
                {/* right box end */}
             </div>
        </div>
 </>)
}

export default Job

