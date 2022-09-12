import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  nickName: '',
  accessToken: '',
  profileImage: '',
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
      state.isAdmin = action.payload.isAdmin;
      state.profileImage = action.payload.profileImage || '';
    },
    initUser() {
      return {
        ...initialState,
      };
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  //   extraReducers: (builder) => {},
});

export default userSlice;
