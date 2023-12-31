import { User2, Users2, LogIn, Folders } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/user-context";

const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  return (
    <div className="flex items-center justify-between py-2 px-8 bg-custom-2">
      <div className="text-white text-xl font-medium transition-transform hover:translate-x-1">
        <Link to={"/"}>
          <h1>Sticky Notes</h1>
        </Link>
      </div>
      <div className="text-lg text-gray-300 flex gap-2 sm:gap-6 font-medium">
        <div
          onClick={() => navigate("/notes")}
          className="cursor-pointer flex items-center gap-1 py-1 px-2 transition-colors rounded hover:bg-custom-1"
        >
          <Folders color="#d1d5db" size={22} />
          <p className="hidden sm:block">My Notes</p>
        </div>
        <div
          onClick={() => navigate("/teams")}
          className="cursor-pointer flex items-center gap-1 py-1 px-2 transition-colors rounded hover:bg-custom-1"
        >
          <Users2 color="#d1d5db" size={22} />
          <p className="hidden sm:block">Teams</p>
        </div>
        {!user ? (
          <div
            onClick={() => navigate("/sign-in")}
            className="cursor-pointer flex items-center gap-1 py-1 px-2 transition-colors rounded hover:bg-custom-1"
          >
            <LogIn color="#d1d5db" size={20} />
            <p className="hidden sm:block">Sign In</p>
          </div>
        ) : (
          <div
            onClick={() => navigate(`/profile/${user.id ?? ""}`)}
            className="cursor-pointer flex items-center gap-1 py-1 px-2 transition-colors rounded-sm hover:bg-custom-1"
          >
            <User2 color="#d1d5db" size={20} />
            <p className="hidden sm:block">{user.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
