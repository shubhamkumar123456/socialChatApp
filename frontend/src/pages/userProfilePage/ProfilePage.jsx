import React, { useEffect,  useState } from 'react'
import FriendList from '../../components/FriendList'
import './profilePage.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../store/AuthSlice'
import { fetchPost } from '../../store/PostSlice'
import { Link } from 'react-router-dom'


const ProfilePage = () => {
    const dispatch = useDispatch();
    const [deleted, setdeleted] = useState(false);
useEffect(()=>{
    
    dispatch(fetchPost())
},[deleted])
    const userDetail = useSelector((state) => state.auth.user)
    const userPost = useSelector((state) => state.post.post)
    console.log(userPost)
    console.log(userDetail)

   
 

    const [url, setUrl] = useState("");
     
   

    const handleDelete =async(post)=>{
        
        console.log(post._id)
        let response = await fetch('http://localhost:2000/api/posts/delete',{
            method: 'DELETE',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({_id: post._id})
        })
        let data = await response.json()
        console.log(data.msg)
        setdeleted(!deleted)
    }

    const profileSubmitHandler=async()=>{
        let response = await fetch('http://localhost:2000/api/posts/updateProfilePic',{
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({userId:userDetail._id,profilePicture:url})
        })
        let data = await response.json();
        console.log(data.user);
        
        dispatch(fetchUser())

            // setImg(data.user.coverPicture);
            console.log("profile uploaded successfully");
        
    }

    const updateCoverPic = async()=>{
         let response = await fetch('http://localhost:2000/api/posts/updateCoverPic',{
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({userId:userDetail._id,coverPicture:url})
        })
        let data = await response.json();
        console.log(data.user);
        
        dispatch(fetchUser())

            // setImg(data.user.coverPicture);
            console.log("image uploaded successfully");
        
        
        
    }
    const convertBase64 =(file)=>{
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload =()=>{
                resolve(fileReader.result)
                setUrl(fileReader.result)
            }
            fileReader.onerror =(error)=>{
                reject(error);
            }
        })
    }

    const handleUpdate=async(e)=>{
       
        // console.log(e.target.files[0])
        let file = e.target.files[0];
        const base64 = await convertBase64(file);
        // console.log(base64);
        // setLoading(true)
       
    }
    const handleProfileUpdate=async(e)=>{
        let file = e.target.files[0];
        const base64 = await convertBase64(file);
    }

  return (
    <div className='profilePage'>
        {/* <div><FriendList/></div> */}
        <div className='followersBox'>
            <Link to={'/followers'}><button className='btnFollower'>{userDetail.followers?userDetail.followers.length:0}{' '}Followers</button></Link>
            <Link to={'/following'}><button className='btnFollowing'>{userDetail.followings?userDetail.followings.length:0}{' '}Followings</button></Link>
        </div>
        <div >
            <div className="coverPicBOx">
                <img className='coverPic' src={userDetail.coverPicture} alt="" />
                    <div className='cameraBox'>
                    <input onChange={handleUpdate} id='coverPicIcon'   type="file"/>
                <label htmlFor="coverPicIcon"><i  style={{color:'white'}} className="bi bi-camera cameraIcon"></i></label>
               <button  onClick={updateCoverPic}>Update Cover</button>
                    </div>
                <div className="userPicBox">
                   <div className='usePicBoxInput'>
                   <input type="file" style={{display:"none"}} id='profileInput' onChange={handleProfileUpdate}/>
                   <label htmlFor="profileInput"><i  style={{color:'white',fontSize:"35px"}} className="bi bi-camera cameraIcon"></i></label>
          
                    <button onClick={profileSubmitHandler}>update Profile</button>
                   </div>
                    <img className='profileImg' src={userDetail.profilePicture} alt="" />
                    <p className='profileName'>{userDetail.name}</p>
                </div>
            </div>
            {userPost && <div className='profilePageAllPost'>
                {userPost.map((post) =>{
                    return  <div key={post._id} className='profilepagePostBox'>
                        <p className='postBoxTitle'>{post.desc}</p>
                        <img className='postImg' src={post.img} alt="" />
                       <div>
                        <div className='profilePageBoxBottom'>
                                <div className='profilePageBoxHeartBox'>
                                <span style={{FILL:"100",color:"red"}} className="material-symbols-outlined">
                                favorite
                        </span>
                        <span>{post.likes.length?post.likes.length:0}</span>
                                </div>
                    <span onClick={()=>{handleDelete(post)}} id="delPostIcon" className="material-symbols-outlined">delete</span>
                        </div>
                       </div>
                    </div>
                })}
            </div>}
            {!userPost.length && 
                <div style={{height:"300px", display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <h1>No post to show</h1>
                </div>
            }
        </div>
        
    </div>
  )
}

export default ProfilePage
