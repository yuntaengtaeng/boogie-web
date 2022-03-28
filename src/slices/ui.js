import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const uiSlce = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showLoading(state) {
      state.isLoading = true;
    },
    hideLoading(state) {
      state.isLoading = false;
    },
  },
  //   extraReducers: (builder) => {},
});

export default uiSlce;
