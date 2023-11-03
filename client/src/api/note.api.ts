import axios from "axios";
import { Note } from "../types";

const noteAPI = axios.create({
  baseURL: "http://localhost:8000/notes",
});

export const getUserNotes = async (userId: string) => {
  const { data } = await noteAPI.get<{ notes: Note[] }>(`/${userId}/user`);
  return data;
};

export const getNoteById = async (id: string) => {
  const { data } = await noteAPI.get<{ note: Note }>(`/${id}`);
  console.log({ data });
  return data;
};

export const createNote = async (info: {
  body: string;
  author: number | string;
  team: number | string | null;
  private: boolean;
  last_user: number | string;
}) => {
  const { data } = await noteAPI.post<{ created: boolean }>("/new", info);
  return data;
};

export const updateNote = async (info: {
  id: string;
  data: {
    body: string;
    private: boolean;
    last_user: number | string;
  };
}) => {
  const { data } = await noteAPI.put<{ updated: boolean }>(
    `${info.id}/update`,
    info.data
  );
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await noteAPI.delete<{ deleted: boolean }>(`${id}/delete`);
  return data;
};
