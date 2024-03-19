import { createSlice } from '@reduxjs/toolkit';
import { appApi } from './app.api';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    ping: 0,
    response: null,
  },
  reducers: {
    incrementPing: (state) => {
      state.ping += 1;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(appApi.endpoints.ping.matchFulfilled, (state, action) => {
      state.response = action.payload;
    });
  },
});

export const { incrementPing } = appSlice.actions;

export const selectApp = (state) => state.app;
export const selectPing = (state) => state.app.ping;

export default appSlice.reducer;
