import React, { useEffect, useRef } from 'react'
import './Chat.css'
import HomeNavbar from '../../Navbar/HomeNavbar'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from '../../../Config/Axios'
import Conversation from '../Conversation/Conversation'
import ChatBox from '../ChatBox/ChatBox'
import {io} from 'socket.io-client'

function Chat() {


  const {userData}=useSelector(state=>state?.login)
console.log(userData,"userData step 1");
const [ chats,setChats]=useState([])
const [currentChat,setCurrentChat]=useState(null)
const socket =useRef();
const [onlineUsers,setOnlineUsers]=useState([]);
const [sendMessage, setSendMessage]=useState(null)
const [receiveMessage, setReceiveMessage]=useState(null)

useEffect(()=>{
  const getChats=async()=>{
    try{
const {data}=await axios.get(`/chat/${userData._id}`)
console.log(data,'data at useeffect getChats -----2')
setChats(data)
    }catch(err){
      console.log(err);
      <Link to={'/Page404'}></Link>
    }
  }
  getChats();
},[userData ])



//conect to socket io
useEffect(()=>{
  socket.current=io('http://localhost:8000')
  socket.current.emit("new-user-add",userData._id)
  socket.current.on('get-users',(users)=>{
    setOnlineUsers(users)
    console.log(users,"onlineusers at chatjs ---10")
  })
},[userData])


// send messgae to scoket to server 
useEffect(()=>{
  if(sendMessage!==null)
  socket.current.emit('send-message',sendMessage)

},[sendMessage])



//receive message from scoket
useEffect(()=>{
  socket.current.on('receive-message',(data)=>{
    console.log(data,"receive message data ")
    setReceiveMessage(data)
  })

},[])
const checkOnlineStatus=(chat)=>{
  const chatMember=chat.memebers?.find((member)=>member!==userData._id)
  const online=onlineUsers.find((user)=>user.userId===chatMember)
  return online?true:false
}


      return (<>
      <HomeNavbar/>
  <div className="Chat pt-20">
    {/* left side  */}
    <div className="Left-side-chat  ">
      Logo Search 
      <div className="Chat-container">
         
     
      <h2>Chats</h2>
      <div className="Chat-list capitalize"> 
      
      {chats.map((chat)=>
      <div onClick={()=>setCurrentChat(chat)}>
        <Conversation data={chat} currentUserId={userData._id} online={checkOnlineStatus(chat)}/>
      </div>

      )}
        </div>
    </div>
    </div>
{/* {rigt side chats } */}
<div className="Right-side-chat ">
<div style={{ width: "20rem", alignSelf: "flex-end" }}>
      navIcons
        </div>
        <ChatBox
          chat={currentChat}  
          currentUserId={userData._id}
           setSendMessage={setSendMessage}
           receiveMessage={receiveMessage}
        />
      </div>

</div>
   
      </>
  )
}

export default Chat 
