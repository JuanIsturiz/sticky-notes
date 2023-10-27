import { useParams } from "react-router-dom";
import TeamForm from "../components/forms/TeamForm";

const CreateTeamPage = () => {
  const { id } = useParams();
  return (
    <div className="max-w-xl mx-auto p-4 mt-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
      <h2 className="text-3xl font-bold text-custom-4 mb-2 text-center">
        {id ? "Update Your Team Info" : "Start a New Team Here!"}
      </h2>
      <TeamForm id={id} />
    </div>
  );
};

export default CreateTeamPage;
