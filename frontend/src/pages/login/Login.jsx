import React, { useRef, useState } from 'react'
import Css from './login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthSlice, { loginUser } from '../../store/AuthSlice'


const Login = () => {
  const [errMsg, seterrMsg] = useState("");

  const dispatch = useDispatch()
  let emailRef = useRef();
  let passwordRef = useRef();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch('http://localhost:2000/api/users/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      })
      let data = await response.json();
      // console.log(data);
      if (response.ok) {
        dispatch(loginUser(data.user))
        navigate('/')
      }
      else{
        seterrMsg(data.msg)
        // console.log(data)
        setTimeout(()=>{
          seterrMsg("")
        },2000)
      }
    } catch (error) {
      seterrMsg(error.msg)
      // console.log(error)

    }
  }
  return (
    <div className={Css.login}>
      <p className={Css.error} style={{textAlign:"center"}}>{errMsg}</p>
      <form action="" className={Css.form}>
        <h1 className={Css.heading}>Login Page</h1>
        <label className={Css.label} htmlFor="">Email</label>
        <input className={Css.input} type="email" ref={emailRef} />
        <label className={Css.label} htmlFor="">Password</label>
        <input className={Css.input} type="password" ref={passwordRef} />
        <button onClick={handleLogin} className={Css.btnLogin}>Login</button>
        <p style={{textAlign:"center"}}>don't have an account? <Link to={'/signup'}>Signup</Link></p>
      </form>
    </div>
  )
}

export default Login
