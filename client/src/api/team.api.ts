import axios from "axios";
import { Team } from "../types";

const teamAPI = axios.create({
  baseURL: "http://localhost:8000/teams",
});

export const getTeams = async (q: string | null) => {
  const { data } = await teamAPI.get<{ teams: Team[] }>(`/?q=${q ?? ""}`);
  return data;
};

export const getTeamById = async (id: string) => {
  const { data } = await teamAPI.get<{ team: Team }>(`/${id}`);
  return data;
};

export const createTeam = async (info: {
  admin: string | number;
  name: string;
  description: string | null;
  is_private: boolean;
  password: string | null;
}) => {
  const { data } = await teamAPI.post<{ created: boolean }>("/new", info);
  return data;
};

export const updateTeam = async (info: {
  id: string | number;
  name: string;
  description: string | null;
  is_private: boolean;
  password: string | null;
}) => {
  const { data } = await teamAPI.put<{ updated: boolean }>(
    `/${info.id}/update`,
    info
  );
  return data;
};

export const deleteTeam = async (id: string) => {
  const { data } = await teamAPI.delete<{ deleted: boolean }>(`/${id}/delete`);
  return data;
};

export const teamAction = async (info: {
  teamId: string;
  userId: string;
  action: "join" | "leave";
  password: string | null;
}) => {
  const { data } = await teamAPI.put<{ success: boolean; message: string }>(
    `/${info.teamId}/subscription`,
    info
  );
  return data;
};
