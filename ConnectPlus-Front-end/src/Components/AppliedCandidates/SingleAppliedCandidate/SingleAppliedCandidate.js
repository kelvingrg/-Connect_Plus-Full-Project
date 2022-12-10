import React, { useEffect } from 'react'
    import UserRoundDp from '../../PostBox/UserRoundDp.js/UserRoundDp'
    import axios from '../../../Config/Axios'
import { useNavigate } from 'react-router-dom'
import { CButton } from '../../Button/CButton'
import { BsThreeDotsVertical } from "react-icons/bs";
import TimeagoDate from '../../TimeagoDate/TimeagoDate'

import { useDispatch, useSelector } from 'react-redux'
import { setOverFlow } from '../../../App/ReduxHandlers/TempDataReducer'
import { AiOutlineCloudDownload ,AiOutlineEye} from "react-icons/ai";
import FileDownload from "js-file-download"
import { setSelectedUserView } from '../../../App/ReduxHandlers/TempDataReducer'
import baseURL from '../../../Constants/Constants'
import { BsTrash } from "react-icons/bs";



import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";



function SingleAppliedCandidate({singleCandidateData, jobPostId,onViewPage}) {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const {selectedUserView}=useSelector(state=>state.tempData)
    useEffect(()=>{},[singleCandidateData])
    
    const resumeView = ({onViewPage}) => {
      axios({
        url:`/getResume?data=${singleCandidateData?.userId?.resume}`,
        method:"post",
        responseType:"blob"
    
      })
      .then((response)=>{
        console.log(response);
        FileDownload(response.data, `${singleCandidateData?.userId?.userName}/resume/${singleCandidateData?.userId?.resume}`)
      })

    }

   const  handleViewUser=()=>{
  //   alert( "**************" )
    dispatch(setSelectedUserView(singleCandidateData?.userId?._id))
    
    !onViewPage &&   navigate(`/UserProfileViewByOthersPage/${jobPostId}`, { state: singleCandidateData?.userId?._id   })

    }
   
  return (
( singleCandidateData ) &&  <div className={`border-b px-2 py-4 z-10 ${(selectedUserView==singleCandidateData?.userId?._id )?"bg-blue-500":"bg-white"} `}   >
        <span className='float-right  ' > 
        <Menu  placement="left-start">
      <MenuHandler>
        <Button variant="text" className="active:bg-none border-0 p-0 m-0">  <BsThreeDotsVertical  /> </Button>
      </MenuHandler>
      <MenuList className='p-0 m-0'>
        <MenuItem className="text-sm py-2 px-4 font-normal  w-full whitespace-no-wrap bg-white text-black hover:text-ccOrange  hover:bg-ccBlack border-b flex items-center gap-2"> <AiOutlineEye/> View </MenuItem>
        <MenuItem className="text-sm py-2 px-4 font-normal  w-full whitespace-no-wrap bg-white text-black hover:text-ccOrange  hover:bg-ccBlack border-b flex items-center gap-2"> <AiOutlineCloudDownload size={15} />Dowload CV</MenuItem>
        <MenuItem className="text-sm py-2 px-4 font-normal  w-full whitespace-no-wrap bg-white text-black hover:text-ccOrange  hover:bg-ccBlack border-b flex items-center gap-2"><BsTrash size={15}/> Delete</MenuItem>

      </MenuList>
    </Menu>
</span> 

    <div className=' flex items-center ' onClick={handleViewUser} >
<div className='w-12 h-12'><UserRoundDp image={`${baseURL}/images/dp/${singleCandidateData?.userId?.dp}`}/></div>

<div className='ml-5'>
    <p className='font-black text-base'>{singleCandidateData.userId.userName}</p>
    <p className='font-medium'>{singleCandidateData.userId.designation}</p>
    <p className=' italic text-sm'> <TimeagoDate timeStamp={singleCandidateData?.userId?.timeStamp}/></p>
    </div>
    </div>
   <div className='mt-2 w-full flex justify-center space-x-3'> 
    <span className='flex items-center space-x-2 ' ><CButton text={'Resume'}> <AiOutlineCloudDownload size={15}/></CButton>
    
    </span>
    </div>
    
    </div>
  )
}

export default SingleAppliedCandidate