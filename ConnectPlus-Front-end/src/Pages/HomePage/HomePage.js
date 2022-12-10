import React, { useEffect, useState } from 'react'
import CasualPostModal from '../../Components/Modal/CasualPostModal/CasualPostModal'
import HomeNavbar from '../../Components/Navbar/HomeNavbar'
import PostBox from '../../Components/PostBox/PostBox'
import './HomePage.css'
import {useSelector} from 'react-redux'
import ProfileBox from '../../Components/ProfileBox/ProfileBox'
import Feeds from '../../Components/Feeds/Feeds'
import axios from '../../Config/Axios'
import { useNavigate } from 'react-router-dom';
import ConnectedUsers from '../../Components/ConnectedUsers/ConnectedUsers'

function HomePage() {
    const {postModal} = useSelector((state) => state ?. modal)
    const [postData,setPostData]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
axios.get("/getCasualPostData").then(response=>{
  if(response?.data?.dataFetched){
    setPostData(response?.data?.data)
  }
  if(response?.data?.loadError){
    navigate('/page404')
  }

})
.catch((error)=>{
  localStorage.clear()
          navigate('/')
})
  },[])
    return (<>

        <div className='parent bg-ccLight h-fit'>
            <HomeNavbar/>
            <div className='flex pt-20  px-10 justify-around  '> {/* left box start  */}
                <div className=' w-1/5 h-auto hidden md:block '>
                    <div className='w-1/5 fixed '>
                        <ProfileBox/>
                    </div>
                </div>
                {/* left box end  */}

                {/* center box start */}
                <div className='justify-self-center items-center w-full md:w-[45%] h-auto block '>
                    <PostBox/>
                    {postData.map((element)=><Feeds data={element}/>)}
                    
                    
                </div>
                {/* center box end */}

                {/* right box start */}
                <div className=' w-1/5   hidden md:block '>
                    <div className='w-1/5 h-[85%] fixed border border-zinc-400 shadow-lg rounded-lg bg-white px-2'>
                 <ConnectedUsers/>
                    </div>
                </div>
                {/* right box end */} </div>
        </div>
        {
        postModal && <CasualPostModal/>
    } </>)
}

export default HomePage
