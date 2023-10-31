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
  last_user: {
    id: string | number;
    username: string;
  };
  created: string;
  updated: string;
}

export interface Team {
  id: string;
  admin: string | number;
  name: string;
  description: string;
  created: string;
  updated: string;
  is_private: boolean;
  members: { id: string; username: string }[];
  notes: Note[];
}
