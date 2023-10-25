export interface User {
  id: string;
  username: string;
  email: string;
}

export type Token = string;

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  bio: string;
  is_verified: boolean;
  user: number;
}

export interface Note {
  id: string | number;
  body: string;
  author: number;
  team: string | number;
  private: boolean;
  last_user: number | string;
  created: Date;
  updated: Date;
}
