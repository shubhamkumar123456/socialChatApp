import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './friendList.css'
import { Link } from 'react-router-dom'
const FriendList = () => {
    const userDetail = useSelector((state) => state.auth.user)
    const [users, setusers] = useState([]);

    useEffect(()=>{
        const getMessages = async()=>{
            let res = await fetch('http://localhost:2000/api/messages/allMessage',{
                method:"POST",
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify({userId:userDetail._id})
            })
            let ans =await res.json()
            setusers(ans)
            console.log(ans)
        }
        getMessages()
    },[userDetail._id])
  return (
    <div className='friendListComponent'>
      <h2 className='friendListComponentHeading' >Chat</h2>
      {/* <Link to={'/chat'} state={{user,userDetail}} className={CSS.sendMsgBtn}>Chat</Link> */}
      {
        users?.map((user)=>{
          return <Link key={user[0]._id} to={'/chat'} state={{user:user[0],userDetail}} className='friendListComponentUser'>
                <img className='friendListComponentImg' src={user[0].profilePicture} alt="" />
                <p className='friendListComponentName'>{user[0].name}</p>
          </Link>
        })
      }
    </div>
  )
}

export default FriendList
