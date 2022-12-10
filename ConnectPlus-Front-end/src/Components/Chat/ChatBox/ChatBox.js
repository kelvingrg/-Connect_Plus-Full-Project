import axios from '../../../Config/Axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import baseURL from '../../../Constants/Constants';
import {format} from 'timeago.js'
import './ChatBox.css'
import InputEmoji from 'react-input-emoji'

function ChatBox({chat, currentUserId ,setSendMessage,receiveMessage}) {
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
const message={
  senderId:currentUserId,
  text:newMessage,
  chatId:chat._id
}
// send messaage to data base 
try{
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

// allways scroll to the last message 
useEffect(()=>{
  scroll.current?.scrollIntoView({behavior:"smooth"})
},[messages])


  return (
<>
<div className='ChatBox-container'>
    {chat?(
<>
<div className="chat-header">
    <div className="follower">
  <div>
        <img src={secUserData?.dp? `${baseURL}/images/dp/${secUserData?.dp}`:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt=""
        className='followerImage'
        style={{width:'3rem',height:'3rem'}}
        />
        <div className="name" style={{fontSize:'0.8rem'}}>

    <span>{secUserData?.userName}</span>
        </div>

    </div>
</div>
<hr style={{width:'85%',border:'0.1px solid #ececec'}} />
</div>
  {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message) => (
                <>
                  <div 
                   ref={scroll}
                    className={
                      message.senderId === currentUserId
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            <div className="chat-sender">
              {/* <div onClick={() => imageRef.current.click()}>+</div> */}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button"
              onClick = {handleSend}
               >Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                //ref={imageRef}
              />
            </div> {" "}
</>):
(
    <span className="chatbox-empty-message">
      Tap on a chat to start conversation...
    </span>
  )
}
</div>
</>
  )
}

export default ChatBox