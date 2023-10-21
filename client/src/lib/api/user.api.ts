import axios from "axios";

const userAPI = axios.create({
  baseURL: "http://localhost:8000/auth",
});

interface User {
  id: string;
  username: string;
  email: string;
}

type Token = string;

interface SignResponse<E> {
  user: User;
  token: Token;
  errors: E;
}

interface Profile {
  image: string;
  bio: string;
  is_verified: boolean;
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
