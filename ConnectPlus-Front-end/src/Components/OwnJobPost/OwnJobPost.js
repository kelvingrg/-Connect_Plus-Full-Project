import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDown from '../DropDown/DropDown';
import { AiFillCaretRight } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import JobPostEditModal from '../Modal/JobPostEditModal/JobPostEditModal';
import { setAllAppliedCandidateData, setSingleJobPostData } from '../../App/ReduxHandlers/TempDataReducer';
import { CButton } from '../Button/CButton';
import axios from '../../Config/Axios'
import { useNavigate } from 'react-router-dom';



function OwnJobPost({singleJobPostData,setCandidates}) {
    const navigate =useNavigate();
    const {jobPostEditModalState}=useSelector(state=>state?.modal)
  
    const dispatch=useDispatch()
    const getAppliedCandidatesData=()=>{
      (axios.get(`/getCandidateDataOfJobApplied?postId=${
        singleJobPostData ?. _id
        }`).then((response) => {
            console.log(response, "respojse at own job post  ");
            if (response ?. data ?. loadError) {
               // navigate('/page404')
            }
            if (response ?. data ?. dataFetched) { 
             dispatch(setSingleJobPostData(response ?. data ?. response))
            }

        }).catch((error) => {
            localStorage.clear()
            navigate('/')
        }))
    }
  
    
  return (
    <>
     <div className={`bg-ccLight bg-transparent-[20%] rounded-lg border-zinc-400 px-5 h-fit mt-3  `} > 
    <div className='w-full py-3 ' >
     
       <span className='float-right py-3' onClick={()=>dispatch(setSingleJobPostData(singleJobPostData))}> <DropDown OwnJobPost={true} > <BsThreeDotsVertical  />
</DropDown></span> 
<div className='flex space-x-5 ' >
<img
className='w-20 h-20 ' 
src={`jobPosts/CompanyLogo/${singleJobPostData.companyLogo}`}
 />

 <div className='felx-1  '>
 <p className='bold text-black font-bold text-lg capitalize float'>{singleJobPostData.designation} </p>
<p className='bold text-black  font-semibold capitalize'> {singleJobPostData.companyName} </p>
<p className='bold text-black  font-thin italic '> {singleJobPostData.timeStamp}</p>
 </div>
 <div className=' grow flex justify-end'>
 <span className=' py-3 mr-10' onClick={getAppliedCandidatesData}><CButton text={"View Candidates"}/> </span>
 </div>

</div>
<p className='bold text-black  font-semibold capitalize'> {singleJobPostData.overView} </p>

 <ul>
    <li className='flex items-center gap-2 capitalize space-x-2'><AiFillCaretRight/>{singleJobPostData.minSalary} lpa  - {singleJobPostData.maxSalary} lpa</li>
    <li className='flex items-center gap-2 capitalize'><AiFillCaretRight/>{singleJobPostData.workMode} </li>
    <li className='flex items-center gap-2 capitalize'><AiFillCaretRight/>{singleJobPostData.workType} </li>
    <li className='flex items-center gap-2 capitalize'><AiFillCaretRight/>{singleJobPostData.maxSalary} </li>
    


</ul>
<p className='bold text-black  font-normal capitalize'>{singleJobPostData.companyLogo} </p>

</div>


    
    </div>


    {jobPostEditModalState && <JobPostEditModal singleJobPostData={singleJobPostData} />} 
     {/* data={element} */}
    </>



  )
}

export default OwnJobPost