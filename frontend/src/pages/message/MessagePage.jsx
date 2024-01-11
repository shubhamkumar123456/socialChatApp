import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import FriendList from '../../components/FriendList'

const MessagePage = () => {
    const userDetail = useSelector((state) => state.auth.user)

    // useEffect(()=>{
    //     const getMessages = async()=>{
    //         let res = await fetch('https://socialbackend2.onrender.com/api/messages/allMessage',{
    //             method:"POST",
    //             headers:{
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify({userId:userDetail._id})
    //         })
    //         let ans = res.json()
    //         console.log(ans)
    //     }
    //     getMessages()
    // },[])
  return (
    <div>
      <FriendList/>
    </div>
  )
}

export default MessagePage
