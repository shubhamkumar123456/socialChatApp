import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem('login'))||{},
    login:JSON.parse(localStorage.getItem('login'))?true:false,
    isLoading:false,
    isError:false,
    searchFriend:[],
}

export const fetchUser = createAsyncThunk('fetchuser',async()=>{
    let email = JSON.parse(localStorage.getItem('login')).email;
    let response = await fetch('http://localhost:2000/api/users/getone', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
      let userDetails = response.json();
      // console.log(userDetails)
      return userDetails
})

export const AuthSlice = createSlice({
  name: 'auth',
  initialState:initialState,
  extraReducers:(builder)=>{
    builder.addCase(fetchUser.pending,(state,action)=>{
        state.isLoading = true
        state.isError= false;
    })
    builder.addCase(fetchUser.rejected,(state,action)=>{
        console.log('Error', action.payload);
        state.isError= true;
        
    })
    builder.addCase(fetchUser.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isError= false;
        state.user = action.payload
        // console.log(action.payload)
    })
  },
  reducers: {
    // signUp: async(state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
  
      
    // },
  
    updateUser: (state,action) => {
            state.user = action.payload;
            // localStorage.setItem('login',JSON.stringify(action.payload));
    },
    loginUser:(state,action) => {
        state.login = true;
        state.user = action.payload
        localStorage.setItem('login',JSON.stringify(action.payload))
        // fetchUser()  
    },

    logoutUser:(state,action)=>{
        state.login = false;
        state.user = {}
       localStorage.removeItem('login')
    },

    searchFriend: (state, action) => {
    //   state.value += action.payload;
    state.searchFriend = action.payload
      // console.log(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const {  updateUser, deleteUser,loginUser,logoutUser,searchFriend } = AuthSlice.actions

export default AuthSlice.reducer