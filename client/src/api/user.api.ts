import axios from "axios";
import { Profile, Token, User } from "../types";

const userAPI = axios.create({
  baseURL: "http://localhost:8000/auth",
});

interface SignResponse<E> {
  user: User;
  token: Token;
  errors: E;
}

export const signIn = async (info: { username: string; password: string }) => {
  const { data } = await userAPI.post<SignResponse<boolean>>("/sign-in", info);
  return data;
};

export const signUp = async (info: {
  email: string;
  username: string;
  password: string;
}) => {
  const { data } = await userAPI.post<SignResponse<string[]>>("/sign-up", info);
  return data;
};

export const signOut = async (info: { token: string }) => {
  const { data } = await userAPI.post<{ ok: boolean }>("/sign-out", info);
  return data;
};

export const sendVerificationMail = async (info: {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}) => {
  const { data } = await userAPI.post<{ sent: boolean }>("/send-email", info);
  return data;
};

export const verifyUser = async (info: { uid: string; token: string }) => {
  const { data } = await userAPI.post<{ verified: boolean }>(
    "/verify-user",
    info
  );
  return data;
};

export const getProfile = async (id: string) => {
  const { data } = await userAPI.get<{ profile: Profile }>(`/profile/${id}`);
  return data;
};

export const updateProfile = async (info: {
  id: string;
  first_name: string;
  last_name: string;
  image?: string;
  bio?: string;
}) => {
  const { data } = await userAPI.put<{ profile: Profile; updated: boolean }>(
    `/profile/${info.id}/update`,
    info
  );
  return data;
};

interface UserInfo {
  notes: {
    id: number;
    body: string;
    private: boolean;
    created: Date;
    updated: Date;
    author: number;
    team: null;
    last_user: number;
  }[];
  teams: {
    id: number;
    name: string;
    description: string;
    created: Date;
    password: null | string;
    updated: Date;
    is_private: boolean;
    admin: number;
    members: number[];
  }[];
}

export const getUserInfo = async (id: string) => {
  const { data } = await userAPI.get<UserInfo>(`/profile/${id}/info`);
  return data;
};
