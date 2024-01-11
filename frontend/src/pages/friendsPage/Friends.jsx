import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CSS from './friends.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/AuthSlice';

const Friends = () => {
  const dispatch = useDispatch()
  const location  = useLocation();
  console.log(location.state)
  const userDetail = useSelector((state) => state.auth.user)
  console.log(userDetail)
  let user = location.state
  // console.log(user)
  const [posts, setposts] = useState([]);


  useEffect(()=>{
    const fetchUserAllPost = async()=>{
      let res = await fetch(`http://localhost:2000/api/posts/getsinglePost/${location.state._id}`);
      let data = await res.json();
      setposts(data)
      console.log(data);
    }
    fetchUserAllPost()
  },[])
  const [show, setShow] = useState(false);

  const handleFollowClick =async()=>{
    let res  = await fetch(`http://localhost:2000/api/users/follow/${user._id}`,{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({userId:userDetail._id})
    })
    let ans = await res.json();
    // console.log(ans);
    dispatch(fetchUser())

  }

  const handleUnFollowClick =async()=>{
    let res  = await fetch(`http://localhost:2000/api/users/unfollow/${user._id}`,{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({userId:userDetail._id})
    })
    let ans = await res.json();
    console.log(ans);
    dispatch(fetchUser())
  }

 useEffect(()=>{
  const checkFollower=async()=>{
    let filterUser = userDetail.followings.filter((ele)=>ele._id===location.state._id);
    console.log(filterUser);
    if(filterUser.length>0){
      console.log("yes available")
      setShow(true)
    }else{
      setShow(false)
      console.log("no available")
    }
  }
  checkFollower()
 },[userDetail.followings])

 
  return (
    <div className={CSS.friends}>
      <div className={CSS.coverBox}>
          <img className={CSS.coverPicture} src={location.state?.coverPicture} alt="" />
          <div className={CSS.profilePicBox}>
              <img className={CSS.profilePicture} src={location.state?.profilePicture} alt="" />
              <p className={CSS.userName}>{location.state.name}</p>
          </div>
          <div className={CSS.friendsfollowersBtn}>
          
               {show ?<button onClick={handleUnFollowClick} className={CSS.btnUnFollow}>Unfollow</button>:<button onClick={handleFollowClick} className={CSS.btnFollow}>Follow</button>}
          </div>
          <Link to={'/chat'} state={{user,userDetail}} className={CSS.sendMsgBtn}>Chat</Link>
      </div>

      <div className={CSS.friendsPagePosts}>
        {!posts.length && <h1>Don't have any posts to show</h1>}
        {posts.map((post)=>{
            return <div key={post._id} className={CSS.postBox}>
                  <p className={CSS.postTitle}>{post.desc}</p>
                  <img className={CSS.postImg} src={post.img} alt="" />
                  <p className={CSS.iconBox}><i style={{color:"red"}} className="bi bi-heart-fill"></i>{post.likes.length}</p>
            </div>
        })}
      </div>

     
    </div>
  )
}

export default Friends
