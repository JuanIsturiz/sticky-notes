import { UserPlus2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchTeamForm from "../components/forms/SearchTeamForm";

const TeamsPage = () => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default TeamsPage;
