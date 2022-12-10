import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {HiXMark} from "react-icons/hi2";
import {CButton} from '../../Button/CButton';
import {setPostModal} from '../../../App/ReduxHandlers/ModalSlice';
import {setVideoPost, setImagePost, setJobPost} from '../../../App/ReduxHandlers/PostTypeReducer';
import UserRoundDp from '../../PostBox/UserRoundDp.js/UserRoundDp'
import {FaRegImage} from "react-icons/fa";
import {BsCameraVideo} from "react-icons/bs";
import CPIcon from '../../Icon/CPIcon';
import {BsBriefcase} from "react-icons/bs";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import CloseButton from '../../CLoseButton/CloseButton';
import Swal from 'sweetalert2'
import axios from '../../../Config/Axios'
import "./CasualPostmodal.css"
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../../App/ReduxHandlers/LoginReducer';



function CasualPostModal() {
    const {userData}=useSelector(state=>state?.login)
    const {videoPost, imagePost, jobPost} = useSelector((state) => state ?. postType)
    const[file,setFile]=useState();
    const[media,setMedia]=useState({});
    const dispatch = useDispatch()
    const navigate=useNavigate()
const [postText,setPostText]=useState(null)
const [fileType,setFileType]=useState("video");

const handleTextChange=(e)=>{
setPostText(e.target.value)

}

const handleMediaChange= (e,)=>{
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
 setMedia({file: e.target.files[0]})
   const mediaType= e.target.files[0].type?.split('/')
    setFileType(mediaType[0])
  
    
}

const doBackendCall=()=>{  
    let formData = new FormData()
    formData.append("media", media.file);
    const mediaType=  file ? doCheckFileType():null  // to check the media type 
    
axios.post('/addNewPost', formData, {
        params: {
            userId: userData._id,
            postText:postText,
            mediaType:mediaType
        },       
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((response) => {
        console.log(response, "response from backend after image upload req gone from front end")
        if (response ?. data ?. loadError) {
            navigate('/page404')
        }
        if (response ?. data ?. upload) {
            console.log("inside modal change ")
            // to set new useradata
            // dispatch(setUserData(response.data.userData[0]))
            // modal close
            dispatch(setPostModal(false))
        }
    }).catch((error => {
        localStorage.clear()
        navigate('/')
    })) }

    // fuction check type of file 
   const doCheckFileType=()=>{
   const mediaType= media?.file?.type?.split('/')
   return(mediaType[0])

   }


const doSwal=()=>{
    alert("no content")
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: " You can't share an empty Post!",
        footer: 'Add the content to post'
      })
}

const handlesubmit=(e)=>{
e.preventDefault();
    ( media?.file||postText)?doBackendCall():doSwal();

    }

       


    return (<div className='ModalTest absolute flex justify-center items-center h-screen w-screen z-30 overflow-visible border float'>

        <div className='md:w-1/2 w-full m-5 md:m-0 bg bg-white h-auto rounded-lg shadow-lg grid justify-items-center'
            onClick={
                (e) => {
                    e.stopPropagation()
                }
        }>

            <div className='w-full  flex justify-between border-b pb-3'>
                <h1 className=' text-lg mt-5 mx-5 font-bold'>Create Your Post</h1><br/>
                <div className='float-right w-fit h-fit pt-4 pr-3'
                    onClick={
                        () => dispatch(setPostModal(false))
                }>
                    <CloseButton />
                    <br/>
                </div>
            </div>


            <div className=' w-[90%] mt-3'>
                <div className=''>
                    <div className='flex mb-3 '>
                        <div className=' w-12 h-12 rounded-full mt-1 '>
                            <UserRoundDp  image={`images/dp/${userData.dp}`}/>
                        </div>
                        <div className='flex-col'>

                            <h1 className='pl-2 font-semibold capitalize'>{userData.userName}
                            </h1>
                            <p className='ml-2 bg-gray-400 flex items-center justify-center rounded-full '>sample</p>

                        </div>

                    </div>
                    <textarea type="text-area"
                        className={
                            ` border border-zinc-400 w-full  rounded-lg px-6 py-2  placeholder-shown:italic placeholder:font-normal focus:border-zinc-600 focus:outline-none ${
                                (videoPost || imagePost) ? "h-auto" : "h-56 "
                            }`
                        }
                        placeholder='share your awesome experience...'
                        name="textContent"
                        onChange={handleTextChange}
                        /> {/* 
   {videoPost && <input type="file"   class="hidden"  />}
   {imagePost && <input type="image" className='bg-zinc-700 w-full'   />}
   {jobPost && <input type="file" className='bg-zinc-700 w-full'  class="hidden"  />} */}

                    {
                    (videoPost || imagePost) ?
                    
                    <>                    
                    <div class=" h-3/4 w-full">

                <div class={
                    `${
                        file ? "hidden" : "flex"
                    } items-center justify-center w-full `
                }>
                    <label class=" w-full h-full  border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div class="flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Attach a file</p>
                        </div>
                        <form action="">
                            <input type="file" class="opacity-0" name="dp" 
                                onChange={handleMediaChange}/>
                        </form>

                    </label>
                </div>
            </div>
  
   { file ? <div className=' w-auto h-72 flex items-center justify-center'>
    
   {

   (fileType=="image") && <img src={file}
            className="w-auto h-full max-h-full grid place-self-center border shadow-lg"/>
            }
              {(fileType=="video") && <video  className="w-auto h-full max-h-full grid place-self-center border shadow-lg" controls>
    <source src={file}/>
</video>
            }
            
            </div> : null}

 
 
</>

 : null
                }


                    <div className='w-full  my-5  '>
                        <div className=' text-black font-thin  flex  space-x-4 '>

                            <CPIcon tippyPlacement="top" tippyContent="Upload video"
                                tooltip={true}>
                                <span onClick={
                                    () => dispatch(setVideoPost(true))
                                }>
                                    <BsCameraVideo size={20}/></span>
                            </CPIcon>

                            <CPIcon tippyPlacement="top" tippyContent="Upload Image">
                                <span onClick={
                                    () => dispatch(setImagePost(true))
                                }>
                                    <FaRegImage size={20}/></span>
                            </CPIcon>

                            <CPIcon tippyPlacement="top" tippyContent="Post Job">
                                <span onClick={
                                    () => dispatch(setJobPost(true))
                                }><BsBriefcase size={20}/></span>
                            </CPIcon>
                        </div>

                        <div className='flex  justify-end '>
                      {  file && <button className='text-red-600 mr-5  hover:border border-red-600 rounded-full px-3 '
                    onClick={
                        () => {
                            setFile(null);
                            setMedia(null);
                            setFileType(null);
                        }
                }>Delete</button>}
                           <span  onClick={handlesubmit} ><CButton text={'Post'}></CButton></span> 
                        </div>


                    </div>


                </div>
            </div>
        </div>


    </div>)
}

export default CasualPostModal
