import { useNavigate } from "react-router-dom";
import notes from "../assets/notes.svg";
import team from "../assets/team.svg";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-2 space-y-8">
      <div className="mt-2 text-center">
        <h2 className="text-3xl text-custom-5 font-medium">Sticky Notes</h2>
        <p className="text-xl text-custom-4 font-medium">
          A place where teams can communicate bya notes
        </p>
      </div>
      <div className="flex items-center justify-center gap-16">
        <div
          className="cursor-pointer w-80 h-96 flex flex-col items-center gap-4 bg-custom-1 p-4 rounded-sm shadow-lg shadow-custom-2 transition-transform hover:scale-105"
          onClick={() => navigate("/notes")}
        >
          <h4 className="text-2xl text-custom-4 font-medium">
            Manage your Notes
          </h4>
          <img src={notes} alt="Notes Svg" />
        </div>
        <div
          className="cursor-pointer w-80 h-96 flex flex-col items-center gap-12 bg-custom-1 p-4 rounded-sm shadow-lg shadow-custom-2 transition-transform hover:scale-105"
          onClick={() => navigate("/teams")}
        >
          <h4 className="text-2xl text-custom-4 font-medium">
            Work with a Team
          </h4>
          <img src={team} alt="Team Svg" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
