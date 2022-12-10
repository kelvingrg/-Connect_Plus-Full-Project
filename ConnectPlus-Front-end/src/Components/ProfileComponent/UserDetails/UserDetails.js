import React,{useEffect} from 'react'
import CompanyLogo from '../../CompanyLogo/CompanyLogo'
import CoverPhoto from '../../CoverPhoto/CoverPhoto'
import UserRoundDp from '../../PostBox/UserRoundDp.js/UserRoundDp'
import { AiOutlineEdit } from "react-icons/ai";
import CPIcon from '../../Icon/CPIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setBasicDetailsModal } from '../../../App/ReduxHandlers/ModalSlice';
import { setUserDpEditModalState } from '../../../App/ReduxHandlers/ModalSlice';
import { AiOutlineEye } from "react-icons/ai";
import FileDownload from "js-file-download"
import axios from '../../../Config/Axios';




function UserDetails({viewUserData}) {

  const resumeView = () => {
  axios({
    url:`/getResume?data=${userData.resume}`,
    method:"post",
    responseType:"blob"

  })
  .then((response)=>{
    console.log(response);
    FileDownload(response.data, `resume/resume/${userData.resume}`)
  })
      
        
    
}



 const {userData}= useSelector((state)=>state?.login)
  const dispatch= useDispatch();
  const {basicDetailsModal}=useSelector((state)=>state?.modal)
  return (
    <div className='border-b border-zinc-400 rounded-lg w-full pb-6 bg-white'>
<div className='relative w-full md:h-60 h-40   flex justify-center'>

   <CoverPhoto image={"https://images.unsplash.com/photo-1608408843539-9a2c43a5a60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1142&q=80"} />
   <div className='absolute  w-32 h-32 md:w-44 md:h-44 rounded-full top-24 md:top-36  left-4 md:left-16' onClick={()=>dispatch(setUserDpEditModalState(true))}> 
   <UserRoundDp image={`images/dp/${viewUserData ? viewUserData?.dp: userData.dp}`}  />
    </div>
</div>


{/* edit button  */}
{viewUserData ? null:<span className='float-right pr-10 pt-10 ' onClick={()=>dispatch(setBasicDetailsModal(true))}>
<CPIcon tippyPlacement="bottom" tippyContent="Update Basic Details ">
<span className='rounded-full'

><AiOutlineEdit size={20} /></span>
</CPIcon>
  </span>}
{/* edit button  */}
<div className='md:flex grid mt-20 md:mt-24 w-full'>
 
<div className='  pl-4 md:pl-16 md:w-1/2 w-full  '>
<p className='text-lg font-bold'>{viewUserData ? viewUserData?.userName : userData.userName}</p>


{/* key roles  */}
 {viewUserData?.keyrole && <p className='text-xs font-thin w-fit'>{  Object.values(viewUserData ? viewUserData?.keyrole : userData?.keyrole).map((element)=>element+" || ")} </p>}
{/* resume  */}
{ userData.resume && <button className='rounded-lg focus: mt-5 px-3 py-2 font-light border flex items-center justify-center active:bg-ccOrange active:text-ccBlack active:border-ccBlack'
onClick={resumeView}
> <AiOutlineEye size={17}/> Resume</button>
}



    </div>
{/* company logo section  */}
    <div className='w-full md:w-1/2 pl-4 pt-5 md:pl-10 flex items-center'>
      <CompanyLogo image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk9v6uG9g5AEonjfD_kYL_yoU_H78-w93Vl_SY3USsjtHVT3PXGkEB_oIVAAzb9JiP5A&usqp=CAU"} />
      <p className='pl-14 '>{viewUserData ? viewUserData?.currentCompanyName: userData.currentCompanyName}</p>
 </div>

    
    </div>

    </div>
  )
}

export default UserDetails
