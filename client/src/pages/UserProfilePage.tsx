import { useUserContext } from "../contexts/user-context";
import { signOut } from "../lib/api/user.api";
import toast from "react-hot-toast";
const UserProfilePage = () => {
  const { user, setUser } = useUserContext();

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
