import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Css from './followers.module.css'
import { fetchUser } from '../store/AuthSlice'


const Followers = () => {
  const dispatch = useDispatch()
    const userDetail = useSelector((state) => state.auth.user)
  
    useEffect(()=>{
      dispatch(fetchUser())
    },[])
  return (
    <div className={Css.followersPage}>
      {userDetail.followers.map((users)=>{
        return <Link state={users} to={'/friends'} className={Css.userBox}>
        <p>{users.name}</p>
        <img className={Css.profilePicture} src={users.profilePicture} alt="" />
</Link>
      })}
       {!userDetail.followers.length && <h1 style={{textAlign:"center"}}>You are not following to anyone right now</h1>}
    </div>
  )
}

export default Followers
