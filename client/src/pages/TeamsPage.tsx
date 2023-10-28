import { UserPlus2 } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchTeamForm from "../components/forms/SearchTeamForm";
import { useEffect, useState } from "react";
import { Team } from "../types";
import { getTeams } from "../api/team.api";
import TeamCard from "../components/TeamCard";
import { useUserContext } from "../contexts/user-context";

const TeamsPage = () => {
  const navigate = useNavigate();
  const [search, _] = useSearchParams();
  const location = useLocation();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserContext();

  useEffect(() => {
    const q = search.get("q");
    console.log({ q });
    const loadTeams = async () => {
      setLoading(true);
      const { teams } = await getTeams(q);
      setTeams(teams);
      setLoading(false);
    };
    loadTeams();
  }, [location]);

  return (
    <div className="p-2">
      <div className="flex justify-end p-2 border-b border-b-custom-3">
        <div className="flex justify-between items-center w-2/3">
          <SearchTeamForm />
          <div
            className="group cursor-pointer flex items-center gap-1 py-1 px-2 bg-custom-3 rounded-sm transition-colors hover:bg-custom-4"
            onClick={() => navigate("/teams/new")}
          >
            <UserPlus2
              size={24}
              color="#d1d5db"
              className="group-hover:invert"
            />
            <p className="text-gray-300 text-lg font-medium group-hover:invert">
              New Team
            </p>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="p-8">
          <p className="text-2xl text-custom-5 text-center font-medium animate-pulse">
            Loading Teams...
          </p>
        </div>
      ) : (
        <div className="max-w-xl mx-auto p-2 space-y-2">
          {teams.map((t) => (
            <TeamCard key={t.id} team={t} userId={user?.id ?? ""} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
