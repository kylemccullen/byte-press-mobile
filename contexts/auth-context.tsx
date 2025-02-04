import { AuthToken } from "@/models/auth-token";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { getUser } from "@/util/user";
import axios from "axios";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  token?: AuthToken;
  setToken?: Dispatch<SetStateAction<AuthToken | undefined>>;
  user?: User;
  tasks?: Task[];
  setTasks?: Dispatch<SetStateAction<Task[]>>;
  setUser?: Dispatch<SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<AuthToken>();
  const [user, setUser] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${token?.accessToken}`;

    if (!user) getUser().then(setUser);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, tasks, setTasks, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
