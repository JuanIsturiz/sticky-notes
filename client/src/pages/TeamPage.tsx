import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Team } from "../types";
import { getTeamById, teamAction } from "../api/team.api";
import { StickyNote, UserCog2, UserMinus2 } from "lucide-react";
import { useUserContext } from "../contexts/user-context";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";

const TeamPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const [team, setTeam] = useState<Team | null>(null);
  useEffect(() => {
    if (!id) return;
    const loadTeam = async () => {
      const { team } = await getTeamById(id);
      setTeam(team);
    };
    loadTeam();
  }, [id]);

  const handleLeave = async () => {
    const { success } = await teamAction({
      action: "leave",
      password: null,
      teamId: id ?? "",
      userId: user?.id ?? "",
    });
    if (success) {
      toast.success("Team Leaved Successfully!");
      navigate("/teams");
    } else {
      toast.error("Failed to Leave Team\nPlease Try Again");
    }
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-3 justify-center items-center gap-2 p-2 border-b border-b-custom-3">
        <div>
          <h3 className="place-self-start text-custom-5 text-xl font-medium">
            Members: {team?.members.length}
          </h3>
        </div>
        <div className="place-self-center flex gap-2 items-center">
          <h3 className="text-custom-5 text-2xl">{team?.name}</h3>
          {team?.admin === user?.id && (
            <div
              className="group cursor-pointer flex items-center justify-center gap-1 py-1 px-2 bg-custom-3 rounded-sm transition-colors hover:bg-custom-4"
              onClick={() => navigate(`/teams/${id}/update`)}
            >
              <UserCog2
                size={24}
                color="#d1d5db"
                className="group-hover:invert"
              />
            </div>
          )}
          {team?.admin !== user?.id && (
            <div
              className="group cursor-pointer flex items-center justify-center gap-1 py-1 px-2 bg-custom-3 rounded-sm transition-colors hover:bg-custom-4"
              onClick={handleLeave}
            >
              <UserMinus2
                size={24}
                color="#d1d5db"
                className="group-hover:invert"
              />
            </div>
          )}
        </div>
        <div
          className="place-self-end group cursor-pointer flex items-center gap-1 py-1 px-2 bg-custom-3 rounded transition-colors hover:bg-custom-4"
          onClick={() => navigate(`/notes/new?team=${team?.id}`)}
        >
          <StickyNote
            size={24}
            color="#d1d5db"
            className="group-hover:invert"
          />
          <p className="text-gray-300 text-lg font-medium group-hover:invert">
            New Note
          </p>
        </div>
      </div>
      <div className="grid grid-cols-[4fr_1fr] p-2">
        <div>
          {team?.notes.map((n) => (
            <NoteCard key={n.id} note={n} redirect={`/${n.id}?team=${id}`} />
          ))}
        </div>
        <div className="p-2 bg-custom-3 rounded-sm shadow shadow-custom-2 max-h-[70vh] overflow-hidden">
          <h4 className="text-gray-300 font-medium text-xl mb-2">Members</h4>
          <hr className="border-custom-2" />
          {team?.members.map((m) => (
            <div key={m.id}>
              <p className="text-gray-300 font-medium py-1.5">{m.username}</p>
              <hr className="border-custom-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
