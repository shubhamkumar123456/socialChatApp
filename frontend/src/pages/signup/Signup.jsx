import React, { useRef, useState } from 'react'
import Css from './signup.module.css'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [errmsg, setErrMsg] = useState("");
  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()
  let cpasswordRef = useRef()
 
  const navigate = useNavigate()

const handleSignup =async(e)=>{
  e.preventDefault()
 
try {
  let response = await fetch('https://socialbackend2.onrender.com/api/users/create',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
     },
    body:JSON.stringify(  {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      cpassword:cpasswordRef.current.value,
     })
    
 })
 const json = await response.json();
console.log(json);
setErrMsg(json.message)
setTimeout(() => {
  setErrMsg("")
}, 5000);
if(response.ok){
  navigate('/login')
}
} catch (error) {
  console.log(error.message)
  setErrMsg(error.message)
  setTimeout(() => {
    setErrMsg("")
  }, 5000);
}
}
  return (
    <div className={Css.signup}>
      
        <form action="" className={Css.form}>
        <h1 style={{textAlign:"center",color:"red"}}>{errmsg}</h1>
            <h1 className={Css.heading}>Sign up page</h1>
            <label className={Css.label} htmlFor="">Name</label>
            <input className={Css.input} type="text" ref={nameRef}/>
            <label className={Css.label} htmlFor="">Email</label>
            <input className={Css.input} type="email" ref={emailRef}/>
            <label className={Css.label} htmlFor="">Password</label>
            <input className={Css.input} type="password" ref={passwordRef}/>
            <label className={Css.label} htmlFor="">Confirm Password</label>
            <input className={Css.input} type="password" ref={cpasswordRef}/>
            {/* <label className={Css.label} htmlFor="">Upload pic</label> */}
            <button onClick={handleSignup} className={Css.btnSignup}>Sign up</button>
            <p style={{textAlign:"center"}}>Already a user? <Link to={'/login'}>Login</Link></p>
            
        </form>
    </div>
  )
}

export default Signup
