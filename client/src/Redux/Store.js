import { configureStore } from '@reduxjs/toolkit'
import userAuthorReducer from './userAuthorSlice'

export let Store = configureStore({
  reducer: {
    loginReducer: userAuthorReducer
  }
})