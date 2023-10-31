import { useUserContext } from "../contexts/user-context";
import { getUserInfo, signOut } from "../api/user.api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const UserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser, profile } = useUserContext();

  const [notes, setNotes] = useState<
    | {
        id: number;
        body: string;
        private: boolean;
        created: Date;
        updated: Date;
        author: number;
        team: null;
        last_user: number;
      }[]
    | null
  >(null);
  const [teams, setTeams] = useState<
    | {
        id: number;
        name: string;
        description: string;
        created: Date;
        password: null | string;
        updated: Date;
        is_private: boolean;
        admin: number;
        members: number[];
      }[]
    | null
  >(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      const { notes, teams } = await getUserInfo(id ?? "");
      setNotes(notes);
      setTeams(teams);
    };
    loadUserInfo();
  }, [id]);

  const handleLogOut = async () => {
    const res = await signOut({ token: user?.token ?? "" });
    if (res.ok) {
      toast.success("Logged Out Successfully!");
    } else {
      toast.error("Something Went Wrong!\nLogging Out Anyways!");
    }
    setUser(null);
  };

  return (
    <div className="p-3">
      <div className="max-w-xl mx-auto p-4 mt-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
        <div className="flex items-center gap-6 mb-3">
          <img
            src={profile?.image}
            alt="User Profile Picture"
            className="w-32 rounded-full border-4 border-custom-3"
          />
          <div>
            <p className="text-3xl font-medium text-custom-5">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-2xl font-medium text-custom-4">
              @{user?.username}
            </p>
            <a
              href={`/profile/${id ?? ""}/edit`}
              className="cursor-pointer underline text-lg font-medium text-gray-300 transition-opacity hover:opacity-80"
            >
              Edit Profile
            </a>
          </div>
        </div>
        <div className="p-1 min-h-[72px] bg-custom-2 mb-6">
          <p className="text-gray-300 text-lg font-medium">{profile?.bio}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 place-items-stretch">
          <div>
            <div>
              <h5 className="text-2xl font-medium text-center text-custom-5 border-b border-b-custom-4">
                Notes
              </h5>
            </div>
            <div className="py-2 space-y-1.5 h-52 overflow-scroll">
              {notes?.map((n, idx) => (
                <div
                  key={n.id}
                  className={`cursor-pointer p-1 ${
                    idx % 2 === 0 ? "bg-custom-3" : "bg-custom-2"
                  }  rounded-sm shadow shadow-custom-1 transition-opacity hover:opacity-80`}
                  onClick={() => navigate(`/notes/${n.id}`)}
                >
                  <p className={"text-gray-300 font-medium"}>
                    {n.body.substring(0, 25)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <h5 className="text-2xl text-center font-medium text-custom-5 border-b border-b-custom-4">
                Teams
              </h5>
            </div>
            <div className="py-2 space-y-1.5">
              {teams?.map((t, idx) => (
                <div
                  key={t.id}
                  className={`cursor-pointer p-1 ${
                    idx % 2 === 0 ? "bg-custom-3" : "bg-custom-2"
                  }  rounded-sm shadow shadow-custom-1 transition-opacity hover:opacity-80`}
                  onClick={() => navigate(`/teams/${t.id}`)}
                >
                  <p className={"text-gray-300 font-medium"}>
                    {t.name.substring(0, 25)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-custom-2 mt-1" />
        <button
          onClick={handleLogOut}
          className="w-full py-1.5 px-3 mt-2 bg-red-500 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
