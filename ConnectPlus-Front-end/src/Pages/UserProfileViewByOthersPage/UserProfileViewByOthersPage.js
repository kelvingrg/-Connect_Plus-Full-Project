import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../Components/Navbar/HomeNavbar'
import ProfileBox from '../../Components/ProfileBox/ProfileBox'


import axios from '../../Config/Axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AppliedCandidates from '../../Components/AppliedCandidates/AppliedCandidates';
import ProfileComponent from '../../Components/ProfileComponent/ProfileComponent';
import UserDetails from '../../Components/ProfileComponent/UserDetails/UserDetails';
import AboutUser from '../../Components/ProfileComponent/About/AboutUser';
import Experience from '../../Components/ProfileComponent/Experience/Experience';
import SkillSession from '../../Components/ProfileComponent/SkillSession.js/SkillSession';
import EducationSession from '../../Components/ProfileComponent/EducationSession/EducationSession';




function UserProfileViewByOthersPage( ) {
  const navigate=useNavigate()
  const {selectedUserView}=useSelector(state=>state.tempData)
  const {id}= useParams()
  console.log(id,"id at UserProfileViewByOthersPage");
  const location = useLocation()
  const [viewUserData,setViewUserData]=useState()
const userId  = location.state; 
console.log((location.state,"user id at profile view "));

useEffect(()=>{
  axios.post('/getUserData',{userId:selectedUserView})
  .then((response)=>{
    console.log(response,"iresponse of userAbout SessionUpdate **********************************************")
    if (response ?. data ?. loadError) {
        navigate('/page404')
    }
    if (response ?. data ?. dataFetched) {
      setViewUserData(response ?. data ?. response[0])
   }

   })
   .catch((error)=>{
    //  localStorage.clear()
    //          navigate('/')
   })

},[selectedUserView])

   
   
  
           

        
    return (<>

        <div className='parent bg-ccLight h-fit min-h-screen '>
            <HomeNavbar/>
            <div className='flex pt-20  px-10 '>
                 {/* left box start  */}
                <div className=' w-[30%] h-auto hidden md:block  '>
                    <div className='w-[30%] fixed bg-green-500 h-[90%] overflow-scroll'>
                    <AppliedCandidates onViewPage={true}/>
                    </div>
                </div>
                {/* left box end  */}

                {/* center box start */}
                <div className=' w-full  h-auto bg-white border rounded-lg shadow-lg border-zinc-400 md:w-[50%] md:ml-16 p-3 min-h-screen  '>
       
       { viewUserData && <>  <UserDetails viewUserData={viewUserData} />
         <AboutUser viewUserData={viewUserData}/>
         <Experience viewUserData={viewUserData}/>
         <SkillSession viewUserData={viewUserData}/>
         <EducationSession viewUserData={viewUserData}/></>}
                </div>

                {/* center box end */}

                 {/* right box start */}
                 {/* <div className=' w-1/5 h-1/2 ml-6 hidden md:block bg-white'>
                 <div className={`w-1/5 h-[85%] fixed border border-ccBlack  scrollbar-hidden shadow-lg rounded-lg o m-2  overflow-x-scroll`}>

                

                    </div>
                    <div></div>
                </div> */}
                {/* right box end */}
             </div>
        </div>
 </>)
}

export default UserProfileViewByOthersPage

