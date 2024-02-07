import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  LOCAL_API_URL } from '../../../lib/constants';
import { UserResponse, UserCredentials } from '../../../lib/models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: LOCAL_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, UserCredentials>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<void, UserCredentials>({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.query<void, string>({
      query: (token) => ({
        url: '/users/logout',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutQuery } = authApi;
