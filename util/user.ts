import axios from "axios";
import { environment } from "@/environments/environment";
import { User } from "@/models/user";
import { AuthToken } from "@/models/auth-token";

export const register = (email: string, password: string): Promise<void> => {
  return axios.post(`${environment.apiUrl}/register`, {
    email,
    password,
  });
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
