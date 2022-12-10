import React, { useEffect, useState } from 'react'
import CasualPostModal from '../../Components/Modal/CasualPostModal/CasualPostModal'
import HomeNavbar from '../../Components/Navbar/HomeNavbar'
import PostBox from '../../Components/PostBox/PostBox'
import './Job.css'
import {useSelector} from 'react-redux'
import ProfileBox from '../../Components/ProfileBox/ProfileBox'
import Feeds from '../../Components/Feeds/Feeds'
import axios from '../../Config/Axios'
import { useNavigate } from 'react-router-dom';
import JobCards from '../../Components/JobCards/JobCards'

function Job() {
    const {postModal} = useSelector((state) => state ?. modal)
    const [jobPostData,setJobPostData]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
axios.get("/jobPostData")
.then(response=>{
  console.log(response);
  if(response?.data?.dataFetched){
    setJobPostData(response?.data?.data)
  }
  if(response?.data?.loadError){
    navigate('/page404')
  }

})
.catch((error)=>{
  console.log(error);
  localStorage.clear()
          navigate('/')
})
  },[])
    return (<>

        <div className='parent bg-ccLight h-fit min-h-screen'>
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
                <div className=' hidden  h-auto  w-3/4 ml-10 md:flex md:flex-wrap justify-evenly  min-h-screen pt-2 '>
                {jobPostData.map(element=><JobCards data={element}/>) }
                    
                    
                </div>
                {/* center box end */}

                {/* right box start */}
                {/* <div className=' w-1/5 h-1/2  hidden md:block '>
                    <div className='w-1/5 fixed border border-ccBlack'>
                        right box
                    </div>
                </div> */}
                {/* right box end */} </div>
        </div>
        {
        postModal && <CasualPostModal/>
    } </>)
}

export default Job
