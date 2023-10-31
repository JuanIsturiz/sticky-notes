import { useNavigate } from "react-router-dom";
import { Team } from "../types";
import { teamAction } from "../api/team.api";
import toast from "react-hot-toast";

interface TeamCardProps {
  team: Team;
  userId: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, userId }) => {
  const { id, name, is_private, description, members } = team;
  const navigate = useNavigate();

  const handleClick = async () => {
    if (members.some((m) => m.toString() === userId.toString())) {
      navigate(`/teams/${id}`);
      return;
    }

    if (is_private) {
      navigate(`/teams/${id}/join`);
    } else {
      const { success } = await teamAction({
        password: null,
        teamId: id,
        userId,
        action: "join",
      });
      if (success) {
        navigate(`/teams/${id}`);
        toast.success(`Joined ${name}!`);
      } else {
        toast.error("Failed to Join Team\nPlease try again");
      }
    }
  };
  return (
    <div
      className="cursor-pointer bg-custom-4 p-4 rounded-sm shadow shadow-custom-1 transition-transform hover:translate-x-2"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-bold">{name}</h5>
        <div className="bg-custom-4 py-1 px-2 rounded-sm">
          <p className="font-medium">{is_private ? "Private" : "Public"}</p>
        </div>
      </div>
      <hr className="border-custom-3 my-2" />
      <div>
        <p className="font-medium">{description}</p>
      </div>
    </div>
  );
};

export default TeamCard;
