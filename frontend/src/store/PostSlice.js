import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    post:[],
}

export const fetchPost = createAsyncThunk('fetchpost',async()=>{
    let userId = JSON.parse(localStorage.getItem('login'))._id;
    let response = await fetch(`http://localhost:2000/${userId}`)
      let userPost = response.json();
    //   console.log(userDetails)
      return userPost
})

export const PostSlice = createSlice({
  name: 'posts',
  initialState:initialState,
  extraReducers:(builder)=>{
   
    builder.addCase(fetchPost.fulfilled,(state,action)=>{
      
      console.log(action.payload)
      state.post=action.payload
    })
  },
  reducers: {
    addPost: (state,action) => {
        let obj = action.payload
        console.log(obj)
            state.post = [...state.post,obj]
            // localStorage.setItem('login',JSON.stringify(action.payload));
    },
    getAllPost:(state,action)=>{

    }

  },
})

// Action creators are generated for each case reducer function
export const {  addPost } = PostSlice.actions

export default PostSlice.reducer