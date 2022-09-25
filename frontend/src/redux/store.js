import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import authReducerLogin from './authSliceLogin'

export const store = configureStore({
  reducer: {
   
    auth:authReducer,
    authLogin:authReducerLogin
  },
})