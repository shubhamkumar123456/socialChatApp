import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const MessagePage = () => {
    const userDetail = useSelector((state) => state.auth.user)

    useEffect(()=>{
        const getMessages = async()=>{
            let res = await fetch('http://localhost:2000/api/messages/allMessage',{
                method:"POST",
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify({userId:userDetail._id})
            })
            let ans = res.json()
            console.log(ans)
        }
        getMessages()
    },[])
  return (
    <div>
      gi i am
    </div>
  )
}

export default MessagePage
