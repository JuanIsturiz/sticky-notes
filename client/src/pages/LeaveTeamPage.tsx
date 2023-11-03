import { useParams } from "react-router-dom";
import { useUserContext } from "../contexts/user-context";
import LeaveTeamForm from "../components/forms/LeaveTeamForm";

const LeaveTeamPage = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  return (
    <div className="max-w-xl mx-auto p-4 mt-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
      <h2 className="text-3xl font-bold text-custom-4 mb-2 text-center">
        Choose a New Admin
      </h2>
      <LeaveTeamForm
        teamId={id ?? ""}
        userId={Number(user?.id) ?? Number("")}
      />
    </div>
  );
};

export default LeaveTeamPage;
