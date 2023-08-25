import { AxiosError } from 'axios';
import { apiService } from '../services';
import User from './models/user';

export const signIn = (email: string, password: string) =>
  apiService
    .post<{ token: string }>(['auth', 'sign-in'], { email, password })
    .catch((err: AxiosError) => Promise.reject(err.response?.data));

export const signUp = (email: string, password: string) =>
  apiService
    .post<{ token: string }>(['auth', 'register'], { email, password })
    .catch((err: AxiosError) => Promise.reject(err.response?.data));

export const getCurrentUser = () =>
  apiService.get<{ user: User }>(['users', 'me']).then(res => res.user);
