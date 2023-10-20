import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user-context";
import { signOut } from "../lib/api/user.api";
import { useEffect } from "react";
import toast from "react-hot-toast";
const UserProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user]);

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
    <div>
      <button onClick={handleLogOut}>logout</button>
    </div>
  );
};

export default UserProfilePage;
