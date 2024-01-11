
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Friends from './pages/friendsPage/Friends';
import About from './pages/About';
import ProfilePage from './pages/userProfilePage/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getUser } from './store/AuthSlice';
import Followers from './components/Followers';
import Following from './components/Following';
import { useEffect } from 'react';
import Chat from './components/Chat';
import MessagePage from './pages/message/MessagePage';

function App() {
  const dispatch = useDispatch();
   


    useEffect(()=>{
      dispatch(fetchUser())
    },[])

  const selector = useSelector((state)=>state.auth)
  // console.log(selector)
    

  return (
    <div className="App">
  
     <BrowserRouter>
       <div style={{height:"4rem"}}> <Navbar /></div>
        <Routes>
        { selector.login && <Route path="/" element={<Home />} />}
          {!selector.login &&  <Route path="/" element={ <Navigate to="/login" /> } />}
        { !selector.login && <Route path="/login" element={<Login />} />}
          {selector.login &&  <Route path="/login" element={ <Navigate to="/" /> } />}
            {/* <Route path='/' element={<Home/>}/> */}
            {/* <Route path='/login' element={<Login/>}/> */}
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/friends' element={<Friends/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/followers' element={<Followers/>}/>
            <Route path='/following' element={<Following/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/chat' element={<Chat/>}/>
            <Route path='/messages' element={<MessagePage/>}/>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
