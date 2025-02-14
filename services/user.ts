import axios from "axios";
import { environment } from "@/environments/environment";
import { RegisterUser, UpdateUser, User, UserOverview } from "@/models/user";
import { AuthToken } from "@/models/auth-token";

export const register = (registerUser: RegisterUser): Promise<void> => {
  return axios.post(`${environment.apiUrl}/register`, registerUser);
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthToken> => {
  const response = await axios.post(`${environment.apiUrl}/login`, {
    email,
    password,
  });

  return response.data as AuthToken;
};

export const getUser = async (): Promise<User> => {
  const response = await axios.get(`${environment.apiUrl}/api/users`);

  return response.data as User;
};

export const updateUser = async (
  id: string,
  updateUser: UpdateUser,
): Promise<User> => {
  const response = await axios.put(
    `${environment.apiUrl}/api/users/${id}`,
    updateUser,
  );

  return response.data as User;
};

export const refreshToken = async (
  refreshToken: string,
): Promise<AuthToken> => {
  const response = await axios.post(`${environment.apiUrl}/refresh`, {
    refreshToken,
  });

  return response.data as AuthToken;
};

export const getUsersOverview = async (): Promise<UserOverview[]> => {
  const response = await axios.get(`${environment.apiUrl}/api/users/overview`);

  return response.data as UserOverview[];
};

export const forgotPassword = async (email: string): Promise<void> => {
  await axios.post(`${environment.apiUrl}/forgotPassword`, { email });
};
