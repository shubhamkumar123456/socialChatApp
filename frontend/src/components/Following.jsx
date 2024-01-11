import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Css from './following.module.css'
import { Link } from 'react-router-dom'
import { fetchUser } from '../store/AuthSlice'

const Following = () => {
    const dispatch = useDispatch()
    const userDetail = useSelector((state) => state.auth.user)

    useEffect(()=>{
      dispatch(fetchUser())
    },[])
  return (
    <div className={Css.followingsPage}>
      {userDetail.followings.map((users)=>{
        return <Link state={users} to={'/friends'} className={Css.userBox}>
                <p>{users.name}</p>
                <img className={Css.profilePicture} src={users.profilePicture} alt="" />
        </Link>
      })}
      {!userDetail.followings.length && <h1 style={{textAlign:"center"}}>You don't have any following</h1>}
    </div>
  )
}

export default Following
