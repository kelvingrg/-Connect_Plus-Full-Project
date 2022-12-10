import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../Components/Navbar/HomeNavbar'
import ProfileBox from '../../Components/ProfileBox/ProfileBox'
import axios from '../../Config/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { CButton } from '../../Components/Button/CButton'
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import AppliedCandidates from '../../Components/AppliedCandidates/AppliedCandidates';
import './DetailedJobPostView.css'
import { GrReturn } from 'react-icons/gr';
import { setSendNotification } from '../../App/ReduxHandlers/TempDataReducer';
import ConnectedUsers from '../../Components/ConnectedUsers/ConnectedUsers'




function DetailedJobPostView() {

    let { id } = useParams();// here the passes id as params will collect from path  
       const location = useLocation();
       const [data,setData]=useState(location?.state);
       const [ checkAppliedOrNot , setCheckAppliedOrNot]=useState(false)
      // console.log(data,"data",id,"postId");
    const navigate=useNavigate()
    const dispatch=useDispatch();

   const {userData}=useSelector(state=>state?.login)
 
   // const [viewFull,setViewFull]=useState(false)
   // const [jobPostData, setJobPostData]=useState([])
   useEffect(()=>{
   axios.get(`getDataForDetailedJobPostView?postId=${id}`)
   .then((response)=>{
       if (response ?. data ?. loadError) {
           navigate('/page404')
       }
       if (response ?. data ?. dataFetched) {
           console.log(response ?. data ?. response,"response ?. data ?. dataFetched  job podt adtaa")

          setData(response?.data?.response)
          setCheckAppliedOrNot(  data?.appliedCandidates?.some(el => el.userId === userData._id))


       }
   
      })
      .catch((error)=>{
        localStorage.clear()
                navigate('/')
      })
// }
     

           },[ ])
        

        

   return (
   <>

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
               <div className=' w-full  h-auto bg-white border rounded-lg shadow-lg border-zinc-400 md:w-[50%] md:ml-10 pt-7 min-h-screen px-5'>
      
               <div className='flex p-3 pt-4'>
     <img
         src={`http://localhost:9000/jobPosts/CompanyLogo/${data?.companyLogo}`}
         className={`w-16 h-16 ${data?.companyLogo?"":"bg-blue-200"}`}
       />
       <div className='pl-4'>
<p className='bold text-black font-bold text-lg capitalize'>{data?.designation} </p>     
<p className='bold text-black  font-semibold capitalize'> {data?.companyName} </p>
       </div>
       <div className='flex justify-end grow'>
      {  !(data?.userId==userData._id) && <span className='pr-10' onClick={
          ()=>{
              
               if(!checkAppliedOrNot )
            {  
                if(userData.resume){
                   axios.post('/applyForAJob',{userId:userData._id,jobPostId:data._id})
                   dispatch(setSendNotification ({userId:userData._id,receiverId:data.userId}))
               }else
               {
                   Swal.fire({
                       title: 'Are you sure to continue without CV ?',
                       text: "Candidtes with updated  cv has the higer chance to get short listed by the employer ",
                       icon: 'warning',
                       showCancelButton: true,
                       confirmButtonColor: '#3085d6',
                       cancelButtonColor: '#d33',
                       confirmButtonText: 'Apply'
                     }).then((result) => {
                       if (result.isConfirmed) {
                           let userid={userId:userData.userId}
                           setData({...data,appliedCandidates : [...data.appliedCandidates,userid]})
                           setCheckAppliedOrNot(true)
                           dispatch(setSendNotification ({userId:userData._id,receiverId:data?.userId}))
                           axios.post('/applyForAJob',{userId:userData._id,jobPostId:data._id})
                       }
                     })
                 }
               }else{
                   Swal.fire({
                       title: 'You have already applied for this oppertunity ',
                       icon: 'warning',
                       showCancelButton: true,
                       confirmButtonColor: '#3085d6',
                  
                     })
               }


             
           }
          } 
          ><CButton text={checkAppliedOrNot?"Applied":"Apply"}/></span>}

       </div> 
       </div> 
       <ul className=' mt-5 pl-3'>
  { <li className='flex items-center gap-2 capitalize space-x-2  font-mono'><h1 className='font- italic font-normal font-sans  text-sm'>Annual package :</h1> {data?.minSalary?data?.minSalary:" Not available "} Lpa - {data?.maxSalary?data.maxSalary:" Not available "} Lpa</li>}
  { <li className='flex items-center gap-2 capitalize font-mono'> <h1 className='font- italic font-normal font-sans  text-sm'>sample :</h1> {} </li>}
  { <li className='flex items-center gap-2 capitalize font-mono '> <h1 className='font- italic font-normal font-sans  text-sm'>Job Type :</h1>   {data?.jobType?data?.jobType:" Not available "} </li>}
  { <li className='flex items-center gap-2 capitalize font-mono '> <h1 className='font- italic font-normal font-sans  text-sm'>Job Mode :</h1>    {data?.jobMode?data?.jobMode:" Not available "} </li>}
   </ul>
   <p className='bold text-black  font-semibold capitalize mt-8'> Job Over View  </p>
   <p className=' text-black  font-normal capitalize'> {data?.overView?data?.overView:" Not available "} </p>
   <p className='bold text-black  font-semibold capitalize mt-8'> Job Description  </p>
   <p className=' text-black  font-normal capitalize '> {data?.jd?data?.jd:" Not available "}</p>

         
               </div>

               {/* center box end */}

                {/* right box start */}
                <div className=' w-1/5  ml-6 hidden md:block '>
                   <div className='w-1/5 h-[85%] fixed border border-ccBlack overflow-y-scroll scrollbar-hidden shadow-lg rounded-lg overflow-x-visible bg-whiite '>
                <ConnectedUsers/>
                   </div>
               </div>
               {/* right box end */}
            </div>
       </div>
</>)
}

export default DetailedJobPostView

