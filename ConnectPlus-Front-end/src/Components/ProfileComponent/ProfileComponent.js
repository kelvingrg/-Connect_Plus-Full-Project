import React, { useEffect } from 'react'
import AboutUser from './About/AboutUser'
import SkillSession from './SkillSession.js/SkillSession'
import Experience from './Experience/Experience'
import './ProfileComponent.css'
import UserDetails from './UserDetails/UserDetails'
import EducationSession from './EducationSession/EducationSession'
import UserBasicDetailsModal from '../Modal/UserProfileEditModal/UserBasicDetailsModal/UserBasicDetailsModal'
import UserProfileEditModal from '../Modal/UserProfileEditModal/UserProfileEditModal'
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfileModalClose } from '../../App/ReduxHandlers/ModalSlice'



function ProfileComponent() {
  const{
    basicDetailsModal,
    userDpEditModalState,
    userAboutSessionModalState,
    userExperienceEditModalState,
    userSkillUpdateModalState,

  
  }=useSelector((state)=>state?.modal)

const dispatch=useDispatch();
  useEffect(()=>{dispatch(setUserProfileModalClose())},[])
  return (
    <>    <div className=' parent pt-20 flex justify-center w-screen ' >
      <div className={ `w-full ${userDpEditModalState?"md:w-[40%]":"md:w-[70%]"}  rounded-lg shadow-lg overflow-hidden  `} >
 <UserDetails />
 <AboutUser/>
 <Experience/>
 <SkillSession/>
 <EducationSession/>

      </div>
   </div>
 { basicDetailsModal && <UserProfileEditModal heading={"Edit Your Profile"}/>}
{userDpEditModalState && <UserProfileEditModal heading={"Upload Your Profile Picture"} />}
{userAboutSessionModalState && <UserProfileEditModal  heading={"Write something about you.."}/>}
{userExperienceEditModalState && <UserProfileEditModal  heading={"Enter your work Experince"}/>}
{userSkillUpdateModalState && <UserProfileEditModal  heading={"Skills Session"}/>}

   </>

  )
}

export default ProfileComponent