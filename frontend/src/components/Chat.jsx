import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './chat.css'

import ChatBoxx from './ChatBoxx';
import {io} from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
import FriendList from './FriendList';

let socket;
const Chat = () => {
    
    const location = useLocation();

const [changed, setchanged] = useState(false);
    let currentUser = location.state.userDetail;
    let friendUser = location.state.user
    // console.log(currentUser)
    // console.log(friendUser)

    useEffect(()=>{
        setchanged(!changed)
    },[currentUser,friendUser])
    const ENDPOINT = 'https://socialbackend2.onrender.com/'

    const [arrivalMsg, setarrivalMsg] = useState(null);
  
//     useEffect(()=>{
//         console.log(location)
// },[friendUser])
const [converSationId, setConverSationId] = useState("");
const [converSation, setConverSation] = useState([]);
const [msgSent, setmsgSent] = useState(false);
// console.log(converSationId)

const [inputValue, setinputValue] = useState("");

useEffect(()=>{
    socket = io(ENDPOINT, { transports : ['websocket'] });
  
  
   if(currentUser._id){
    socket.emit('addUser',currentUser._id)
   }
   socket.on('getUsers',(users)=>{
    // console.log(users)
   })
    // console.log(location.state)
  
    return ()=>{
      socket.emit('disconect');
    //   socket.off();
    }
  },[ENDPOINT,currentUser,friendUser])

useEffect(()=>{
    const createConversation =async()=>{
        let res = await fetch('https://socialbackend2.onrender.com/api/conversation/create',{
            method: 'POST',
            headers:{
              'content-type': 'application/json'
            },
            body:JSON.stringify({senderId:currentUser._id,recieverId:friendUser._id})
          })
          let data = await res.json()
        //   console.log(data)
          setConverSation(data)
          setConverSationId(data._id)
        //   console.log(data)
       
          
    }
    createConversation()
   
  },[friendUser,currentUser])

 




const handleInputChange =(e)=>{
    setinputValue(e.target.value);
}

const handleSendMessage = async()=>{
    
   socket.emit('sendMessage',{
    senderId:currentUser._id,
    recieverId:friendUser._id,
    text:inputValue
   })
     

    let res = await fetch(`https://socialbackend2.onrender.com/api/messages/create`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({conversationId:converSationId,sender:currentUser._id,text:inputValue})
    });

    let data = await res.json();
    setmsgSent(!msgSent)
    setinputValue("")
    // console.log(data);
}




useEffect(()=>{
    socket.on('getMessage',data=>{
        setarrivalMsg({
            sender:data.senderId,
            text:data.text,
            createdAt:Date.now(),
        })
    })
},[handleSendMessage,arrivalMsg,msgSent])
console.log(arrivalMsg)

const [showSidebar, setshowSidebar] = useState(false);

const [screenSize, setScreenSize] = useState(getCurrentDimension());

function getCurrentDimension(){
  return {
      width: window.innerWidth,
      height: window.innerHeight
  }
}

useEffect(() => {
    const updateDimension = () => {
        setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    if(screenSize.width>1000){
        setshowSidebar(true)
    }else{
        setshowSidebar(false)
    }


    return(() => {
        window.removeEventListener('resize', updateDimension);
    })
}, [screenSize])



    return (
        <div className='chatComponent'>
           {showSidebar && <div className="chatCompontnLeft">
           
      <FriendList/>
   
            </div>}
            <div className="chatCompontnRight">
                <div className="chatComponentChatBox">
                    <div className='chatComponentHeader'>
                        <img className='friendProfilePic' src={friendUser.profilePicture} alt="" />
                        <span className='friendName'>{friendUser.name}</span>
                    </div>
                    <ScrollToBottom className="chatComponentContent">

                       {converSationId.length>0 &&<ChatBoxx friendUser={friendUser} converSation={converSation} arrivalMsg={arrivalMsg}  msgSent={msgSent} currentUser={currentUser} converSationId={converSationId.length>0&&converSationId}/>}
                        
                       
                      
                        
                      
                       
                    </ScrollToBottom>
                    <div className="chatComponentFooter">
                        <input onChange={handleInputChange} value={inputValue} className='chatComponentInput' type="text" placeholder='write your message here...'/>
                        <button onClick={handleSendMessage}  className='chatComponentSendBtn'>Send Message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
