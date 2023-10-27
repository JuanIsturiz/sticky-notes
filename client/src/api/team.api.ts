import axios from "axios";
import { Team } from "../types";

const teamAPI = axios.create({
  baseURL: "http://localhost:8000/teams",
});

export const getTeams = async (q: string | null) => {
  const { data } = await teamAPI.get<{ teams: Team[] }>(`/?q=${q ?? ""}`);
  return data;
};

export const getTeam = async (id: string) => {
  const { data } = await teamAPI.get<{ team: Team }>(`/${id}`);
  return data;
};

export const createTeam = async (info: {
  name: string;
  description: string;
  is_private: string;
}) => {
  const { data } = await teamAPI.post<{ created: boolean }>("/", info);
  return data;
};

export const updateTeam = async (info: {
  name: string;
  description: string;
  is_private: string;
}) => {
  const { data } = await teamAPI.put<{ updated: boolean }>("/", info);
  return data;
};

export const deleteTeam = async (id: string) => {
  const { data } = await teamAPI.delete<{ deleted: boolean }>(`/${id}`);
  return data;
};
