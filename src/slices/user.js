import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  nickName: '',
  accessToken: '',
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.nickName = action.payload.nickName;
      state.accessToken = action.payload.accessToken;
      state.isAdmin = action.payload.isAdmin;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  //   extraReducers: (builder) => {},
});

export default userSlice;
