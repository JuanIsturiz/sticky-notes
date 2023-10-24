import React, {
  type ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile } from "../api/user.api";

interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  bio: string;
  is_verified: boolean;
  user: number;
}

interface IUserContext {
  user: User | null;
  profile: Profile | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setProfile: React.Dispatch<React.SetStateAction<any | null>>;
}

const UserContext = createContext<IUserContext | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if (!user) {
      navigate("/sign-in");
      return;
    }
    const loadProfile = async () => {
      const { profile: resProfile } = await getProfile(user.id);
      setProfile(resProfile);
      if (!resProfile.is_verified && pathname !== "/verify/") {
        navigate("/verify");
      }
    };
    loadProfile();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, profile, setUser, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
