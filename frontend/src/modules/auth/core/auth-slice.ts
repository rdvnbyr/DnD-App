import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';
import { UserCredentials } from '../../../lib/models';
import { authApi } from './auth-api';

interface AuthState {
  user: UserCredentials | null;
  isAuthenticated: boolean;
  token?: string | null;
  error: string | null;
  status: 'idle' | 'failed' | 'success';
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  status: 'idle',
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    test: (state, action: PayloadAction<UserCredentials>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });
    builder.addMatcher(authApi.endpoints.logout.matchRejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });
  },
});

export const { test } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth satisfies AuthState;

export default authSlice.reducer;
