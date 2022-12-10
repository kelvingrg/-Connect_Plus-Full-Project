import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../Components/Navbar/HomeNavbar'
import ProfileBox from '../../Components/ProfileBox/ProfileBox'
import axios from '../../Config/Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobPostData, setSingleJobPostData } from '../../App/ReduxHandlers/TempDataReducer'
import { BiArrowToTop,BiArrowToBottom } from "react-icons/bi"
import ConnectionReqSingle from '../../Components/ConnectionReqSingle/ConnectionReqSingle'
import ConnectionSuggSingle from '../../Components/ConnectionSuggSingle/ConnectionSuggSingle'
import ConnectedUsers from '../../Components/ConnectedUsers/ConnectedUsers';



function Connections() {
    const {userData}=useSelector(state=>state?.login)
    const {overFlow}=useSelector(state=>state?.tempData)
    const [connectionSuggData, setConnectionSuggData]=useState([])
    const [connectionReqData, setConnectionReqData]=useState([])

  const navigate=useNavigate()
    const dispatch=useDispatch()

   
    useEffect(()=>{
        axios.get(`/getConnectionSuggestionData?userId=${userData._id}`)
        .then((response)=>{
        //   console.log(response,"iresponse ofgetConnectionSuggestionData ")
          if (response ?. data ?. loadError) {
              navigate('/page404')
          }
          if (response ?. data ?. dataFetched) {
            //   console.log(response,"iresponse of own jiob post data ")
              setConnectionSuggData(response?.data?.response)
              
              console.log(response);
          }
        
         })
         .catch((error)=>{
           localStorage.clear()
                   navigate('/')
         })
        
            },[ ])


            useEffect(()=>{
                axios.get(`/getConnectionRequestData?userId=${userData._id}`)
                .then((response)=>{
                //   console.log(response,"iresponse ofgetConnectionSuggestionData ")
                  if (response ?. data ?. loadError) {
                      navigate('/page404')
                  }
                  if (response ?. data ?. dataFetched) {
                      console.log(response,"iresponse after connection req data fetrected  ")
                      setConnectionReqData(response?.data?.data)
                      
                      console.log(response);
                  }
                
                 })
                 .catch((error)=>{
                   localStorage.clear()
                           navigate('/')
                 })
                

            },[])
           

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
                <div className=' w-full h-auto   md:w-[50%] md:ml-10 space-y-3  '>
                    
              
                { (connectionReqData.length > 0) && <div className=' bg-white   border border-t border-b rounded-b-lg rounded-t-lg shadow-lg border-zinc-400 '>
                    <p className=' font-semibold   p-3 broder border-b border-t rounded-t-lg '>Connection Requests</p>
                  
                

                {/* map start here((  */}
            { connectionReqData.map((element)=> <ConnectionReqSingle  data={element} />) }
              {/* map end  here  */}


              <div className='w-full bg-green flex items-center justify-center py-4'> <span className='animate-bounce w-6 h-6 '><BiArrowToBottom size={20}/> <BiArrowToTop size={20}/></span></div>


                </div>}
                
                

                <div className=' bg-white   border border-t border-b rounded-b-lg rounded-t-lg shadow-lg border-zinc-400'>
                    <p className=' font-semibold   p-3 broder border-b border-t rounded-t-lg '>New Suggestions</p>
                  
                    <div className=' hidden  h-auto  w-full bg-green  md:flex md:flex-wrap justify-evenly  pt-2 '>
             {/* map start here  */}
            {   connectionSuggData.map((element)=>   <ConnectionSuggSingle data={element}/>)}
              {/* map end  here  */}
                    
                    
                </div>

                


             
              <div className='w-full bg-green flex items-center justify-center py-4'> <span className='animate-bounce w-6 h-6 '><BiArrowToBottom size={20}/> <BiArrowToTop size={20}/></span></div>


                </div>
                














                
                </div>

                {/* center box end */}

                 {/* right box start */}
                 <div className=' w-1/5 h-1/2 ml-6 hidden md:block bg-white'>
                 <div className={`w-1/5 h-[85%] fixed border border-ccBlack  scrollbar-hidden shadow-lg rounded-lg px-2 bg-white overflow-y-scroll`}>
                 <ConnectedUsers/>
                    </div>
                    <div></div>
                </div>
                {/* right box end */}
             </div>
        </div>
 </>)
}

export default Connections

