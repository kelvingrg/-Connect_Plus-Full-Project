import axios from '../../Config/Axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdSend } from "react-icons/md";

import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import UserRoundDp from '../PostBox/UserRoundDp.js/UserRoundDp';
import { CButton } from '../Button/CButton';
import baseURL from '../../Constants/Constants';

function Chat2Box({chat, currentUserId ,setSendMessage,receiveMessage}) {
    const t=true
    console.log(chat,currentUserId,"chat,currentUserId in chatBox ----6");
    const [secUserData, setSecUserData]=useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')
    const scroll=useRef();


    const navigate=useNavigate()

     //fetching data for header 
     useEffect(()=>{
      const userId=chat?.members.find((id)=>id!==currentUserId)
      console.log(userId,"userId of ther user in chatBoix ----7");
  
      try{
          const getUserData=async()=>{
          const {data}=await axios.post('/getUserData',{userId:userId})
          console.log(data.response[0],"data..response[0] at chatBox -getuserdata fn ----8");
          setSecUserData(data.response[0])
          }
    ( chat!==null) && getUserData();
      }
      catch(err){
          console.log(err);
          navigate('/page404')
      }

  },[chat,currentUserId])

  // fetching data for messages 
    
  useEffect(()=>{
    const fetchMessages=async()=>{
        try{
const {data}=await axios.get(`/message/${chat._id}`)
console.log(data,"data] at chatBox -fetchMessages fn ----9");
setMessages(data)
        }catch(err){
            console.log(err);
              navigate('/page404')
        }
    }
    (chat!==null) && fetchMessages();
},[chat])

   


  useEffect(()=>{
if(receiveMessage!==null && receiveMessage.chatId===chat._id)
setMessages([...messages,receiveMessage])

  },[receiveMessage])

   

    
    const handleChange=(newMessage)=>{
setNewMessage(newMessage)

    }

const handleSend=async (e)=>{
e.preventDefault()
if(newMessage==null || newMessage==""){
alert("nothing to send ")
}else
{const message={
  senderId:currentUserId,
  text:newMessage,
  chatId:chat._id}

// send messaage to data base 
try{
    setNewMessage('')
const {data}=await axios.post('/message/', message)
setMessages([...messages,data])
setSendMessage('')
}catch(err){
  console.log(err);
  navigate('/page404')
}
// send message to socket server 
const receiverId=chat.members.find((id)=>id!==currentUserId)
console.log(message,"message at chatbox inside handle send ");
setSendMessage({...message,receiverId})
}
}

// allways scroll to the last message 
useEffect(()=>{
  scroll.current?.scrollIntoView({behavior:"smooth"})
},[messages])





      return (
<div className=' h-full w-full flex flex-col'>
{chat?(
    <>
    {/* chat box header start */}
<div className=' flex py-1 px-1   bg-gray-100 border-b  rounded-t-lg shadow-lg static mb-6'>           
<div className='h-12 w-12  '>
    <div className=' h-12 w-12'>
   
    <UserRoundDp image={secUserData?.dp? `${baseURL}/images/dp/${secUserData?.dp}`:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}

/>
    </div>

</div> 
<div className=' ml-2 w-full pt-1 px-3 rounded-lg  '>

<div className='  rounded-full  w-3 h-3 bottom-2  left-[1.1rem] bg-green-500 float-right mt-3'> </div>
 <p className="text-lg font-semibold leading-[1.2rem]">{secUserData?.userName}</p>
 <p className=" text-sm font-thin leading-[0.8rem] italic">{secUserData?.currentDesignation}</p>

</div>
</div>
    {/* chat box header ends  */}

{/* message box starts  */}
<div className=' w-full  h-full    px-2 justify-end   overflow-y-scroll scroll-bar-hidden '>
   
{messages.map((message) => (
    <div
    ref={scroll}
    className={`flex mb-4 ${ (message.senderId === currentUserId) ?"justify-end":"justify-start w-full  "}`}>
    <div className={`rounded-lg h-fit w-fit px-2 py-2 max-w-[80%] break-words border flex-1  ${(message.senderId === currentUserId)? " bg-blue-100 " : "  bg-gray-100 "}`} >
        <p >{message.text}</p>{" "}
<br /> 
<span className="text-xs font-thin inline float-right pr-3">{format(message.createdAt)}</span>
</div>
</div>
    ))}

</div>


<div className='h-20 w-full flex items-center border shadow-lg'>
<div className=' h-12 w-12 hidden md:flex '>
   
   <UserRoundDp image=
"https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcochin&psig=AOvVaw2sR70RtpHS5xjPy99-nGHw&ust=1670309604646000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNibs6by4fsCFQAAAAAdAAAAABAE"

// {`images/dp/${element.dp}`}

/>
</div>
<InputEmoji
               value={newMessage}
               onChange={handleChange}
              />
              <div className=""
              onClick = {handleSend}
               ><CButton><MdSend/> </CButton></div>
              <input
                type="file"
                name=""
                id=""
                className='border-2'
                style={{ display: "none" }}
                //ref={imageRef}
              />

    
</div>

</>):
(
    <span className="w-full h-full flex items-center justify-center">
      Tap on a chat to start conversation...
    </span>
  )}
   </div>


  )
}

export default Chat2Box