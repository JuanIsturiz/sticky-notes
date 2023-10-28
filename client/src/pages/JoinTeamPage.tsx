import { useParams } from "react-router-dom";
import JoinTeamForm from "../components/forms/JoinTeamForm";
import { useUserContext } from "../contexts/user-context";

const JoinTeamPage = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  return (
    <div className="max-w-xl mx-auto p-4 mt-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
      <h2 className="text-3xl font-bold text-custom-4 mb-2 text-center">
        Password Confirmation
      </h2>
      <JoinTeamForm teamId={id ?? ""} userId={user?.id ?? ""} />
    </div>
  );
};

export default JoinTeamPage;
