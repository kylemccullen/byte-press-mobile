import { AuthToken } from "@/models/auth-token";
import { User } from "@/models/user";
import { getUser } from "@/services/user";
import axios from "axios";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user?: User | null;
  token?: AuthToken | null;
}

export enum AuthActionType {
  LOGIN = "LOGIN",
  SET_TOKEN = "SET_TOKEN",
  SET_USER = "SET_USER",
  LOGOUT = "LOGOUT",
}

interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      AsyncStorage.setItem("token", JSON.stringify(action.payload.authToken));
      return {
        ...state,
        token: action.payload.authToken,
      };
    case AuthActionType.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case AuthActionType.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case AuthActionType.LOGOUT:
      AsyncStorage.setItem("token", JSON.stringify(null));
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  authState?: AuthState;
  authDispatch?: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: any) => {
  const [authState, authDispatch] = useReducer(authReducer, {});

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${authState.token?.accessToken}`;

    if (!authState.user) {
      getUser().then((user: User) =>
        authDispatch({ type: AuthActionType.SET_USER, payload: { user } }),
      );
    }
  }, [authState.token]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
