import React, { useEffect, useRef, useState } from 'react'
import FriendList from '../../components/FriendList'
import './home.css'
import { useSelector } from 'react-redux'

const Home = () => {
  const [timlinePost, setTimlinePost] = useState([]);
  console.log(timlinePost)
  const inputRef = useRef()
  const [inputValue, setinputValue] = useState("");
  const getUser = useSelector((state) => state.auth)
  console.log(getUser.user._id)


  const convertBase64 =(file)=>{
    return new Promise((resolve, reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload =()=>{
          resolve(fileReader.result)
          setinputValue(fileReader.result)
      }
      fileReader.onerror =(error)=>{
          reject(error);
      }
  })
  }
  const handleInputChange =async(e)=>{
    let value = e.target.files[0];
    const base64 = await convertBase64(value);
    // setinputValue(value)
    console.log(value)
  }
  const handleCancelPreview =()=>{
    console.log("clicked")
    setinputValue(null)
  }

  const handlePost =async()=>{
    let input = inputRef.current.value
    console.log("inputValue",inputValue)
    let response = await fetch('https://socialbackend2.onrender.com/api/posts/create',{
      method:"POST",
      headers:{
          'content-type':'application/json'
      },
      body:JSON.stringify({userId:getUser.user._id,img:inputValue,desc:input})
  })
  let data = await response.json();
  console.log(data);
  
  // dispatch(fetchUser())

      // setImg(data.user.coverPicture);
      console.log("image uploaded successfully");
      setinputValue(null)
      
  }

  useEffect(()=>{
    const fetchTimeLinePost = async()=>{
      let res = await fetch('https://socialbackend2.onrender.com/api/users/timeLinePosts',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"_id":getUser.user._id})
      })
      let ans = await res.json();
      setTimlinePost(ans)
     
    }
    fetchTimeLinePost()
  },[])
  return (
    <div className='homepgae'>
      <div className='homePageLeft'>
      <FriendList/>
      </div>
      <div className='homePageRight'>
          <div className='hpRightContainer'>
            <div className='hpRightContainerTop'>
              <img src={getUser.user.profilePicture} alt="" />
              <textarea className='textArea' cols={100} rows={5} type="text" ref={inputRef} placeholder='Whats on your mind?' />
            </div>
            <div className='hpRightContainerBottom'>
              <input onChange={handleInputChange} type="file" id='inputBtn' style={{display:"none"}} />
              <label className='btnPhoto' htmlFor="inputBtn">Photo <i style={{fontSize:"20px"}} className="bi bi-camera"></i></label>
              <button style={{border:"none",marginLeft:"10px"}}>Feeling Activity</button>
            </div>
           {inputValue && <div className='previewPost'>
            <i onClick={handleCancelPreview}  className="bi bi-x-circle-fill closeIcon"></i>
                  <p>{inputRef.current.value}</p>
                  <img className='previewImg' src={inputValue} alt="" />
                  <button onClick={handlePost}  className='btnPost'>Post</button>
            </div>}
          </div>

          <div className='timeLinePostsContainer'>
           {timlinePost.map((post)=>{
            return <div key={post._id} className='timelinePostBox'>
                  <p className='timelinePostBoxP'>{post.desc}</p>
                  <img src={post.img} alt="" />
                  <p style={{textAlign:"center"}} className='timelinePostBoxP'><i className="bi bi-heart-fill"></i>{post.likes.length}</p>
            </div>
           })}
           {timlinePost.length<=0 && <p>No Post to show yet or follow users to show posts</p>}
      </div>
           
      </div>

      
      
    </div>
  )
}

export default Home
