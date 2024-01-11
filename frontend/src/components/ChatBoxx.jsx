import React, { useCallback, useEffect, useState } from 'react'
import './chatboxx.css'


const ChatBoxx = (props) => {

    const [messages, setmessages] = useState([]);
  

// console.log(props.msgSent)
    let converSationId = props.converSationId;
    let currentUser = props.currentUser;
    let friendUser = props.friendUser;
    let arrivalMsg = props.arrivalMsg;
    let converSation = props.converSation;

    // console.log(currentUser)
    // console.log(friendUser)
 

    const cachedFn = useCallback(async()=>{
        let res = await fetch(`https://socialbackend2.onrender.com/api/messages/${converSationId}`);
        let data = await res.json();
        console.log(data)
        setmessages(data)
    }, [messages,props.msgSent,friendUser,currentUser,converSationId,arrivalMsg])



    useEffect(() => {

        cachedFn()
    }, [props.msgSent ,friendUser,currentUser,converSationId,arrivalMsg]);

    useEffect(()=>{
        // console.log(arrivalMsg)
        arrivalMsg && converSation?.members.includes(arrivalMsg.sender) &&
        setmessages([...messages,arrivalMsg])
    },[arrivalMsg,converSation])
  return (
    <>
        {messages.map((message) => {
                return <div key={message._id} className="chatComponentchats">
                        <img className={message.sender === currentUser._id?'chatComponentProfilePicRight':"chatComponentProfilePicLeft"} src={message.sender === currentUser._id?currentUser.profilePicture:friendUser.profilePicture} alt="" />
                    <p className={message.sender === currentUser._id ? 'chatComponentMsgRight' : "chatComponentMsgLeft"}>
                        {message.text}</p>
                </div>
            })}
    </>
  )
}

export default ChatBoxx
