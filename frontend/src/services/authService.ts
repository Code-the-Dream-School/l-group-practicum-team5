import { apiClient } from './apiClient';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type ApiSuccess<TData> = {
  success: true;
  message?: string;
  data: TData;
};

export type AuthUserData = {
  user: User;
};

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};

export type AuthUserResponse = ApiSuccess<AuthUserData>;

export type LogoutResponse = {
  message: string;
};

// Creates a user account and returns the new user.
export const registerUser = (payload: RegisterUserPayload) =>
  apiClient.post<AuthUserResponse>('/auth/register', payload);

// Logs in and lets the browser keep the auth cookie.
export const loginUser = (payload: LoginUserPayload) =>
  apiClient.post<AuthUserResponse>('/auth/login', payload);

// Clears the auth cookie on the backend.
export const logoutUser = () => apiClient.post<LogoutResponse>('/auth/logout');

// Checks whether the current auth cookie still belongs to a user.
export const getCurrentUser = () => apiClient.get<AuthUserResponse>('/auth/me');
