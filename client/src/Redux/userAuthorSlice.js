import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let loginThunk = createAsyncThunk('login-info', async (loginObj, thunkApi) => {
  let res;
  try {
    if (loginObj.userType === 'user')
      res = await axios.post("http://localhost:4000/user-api/login", loginObj)
    else
      res = await axios.post("http://localhost:4000/author-api/login", loginObj)
    if (res.data.message === "Login successful")
      localStorage.setItem("token", res.data.token)
    else
      return thunkApi.rejectWithValue(res.data.message)
    return res.data
  }
  catch (err) {
    return thunkApi.rejectWithValue(err)
  }
})

export let userAuthorSlice = createSlice({
  name: 'login-info',
  initialState: {
    isPending: false,
    loginStatus: false,
    currentUser: {},
    errorOccured: false,
    errMsg: ''
  },
  reducer: {
    resetState: (state, action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginStatus = false;
      state.errMsg = '';
      state.errorOccurred = false;
    }
  },
  extraReducers: builder => builder
    .addCase(loginThunk.pending, (state, action) => {
      state.isPending = true;
    })
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.isPending = false;
      state.currentUser = action.payload.user;
      state.loginStatus = true;
      state.errMsg = '';
      state.errorOccurred = false;
    })
    .addCase(loginThunk.rejected, (state, action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginStatus = false;
      state.errMsg = action.payload;
      state.errorOccurred = true;
    })
})

// Export action creater function
export let { resetState } = userAuthorSlice.actions

//export root reducer
export default userAuthorSlice.reducer