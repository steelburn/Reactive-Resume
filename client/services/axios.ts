import _axios, { AxiosError } from 'axios';
import Router from 'next/router';
import toast from 'react-hot-toast';

import { logout } from '@/store/auth/authSlice';

import store from '../store';

export type ServerError = {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
};

const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_GATEWAY,
});

export const uninterceptedAxios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_GATEWAY,
});

axios.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;
    const code = error.isAxiosError ? (response?.data as ServerError).statusCode : error.code;
    const message = error.isAxiosError ? (response?.data as ServerError).message : error.message;

    toast.error(message);

    if (code === 401) {
      store.dispatch(logout());
      Router.push('/');
    }

    throw error;
  },
);

export default axios;
