import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../store/AuthSlice'
import PostReducer from '../store/PostSlice'
export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        post:PostReducer
      },
})