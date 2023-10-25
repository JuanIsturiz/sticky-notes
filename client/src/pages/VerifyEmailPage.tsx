import { useUserContext } from "../contexts/user-context";
import { sendVerificationMail, verifyUser } from "../api/user.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { user, profile } = useUserContext();
  const [search, _] = useSearchParams();

  useEffect(() => {
    const uid = search.get("q")?.split("~")[0];
    const token = search.get("q")?.split("~")[1];
    if (!profile) return;

    if (profile.is_verified) {
      toast.success("User Already Verified!\nRedirecting to Homepage.");
      navigate("/onboarding");
      return;
    }

    if (uid && token) {
      const tryVerify = async () => {
        const res = await verifyUser({
          uid,
          token,
        });

        if (res.verified) {
          toast.success("User Verified Successfully!");
          navigate("/onboarding");
        } else {
          toast.error("Failed to verify user\nPlease Try Again");
          navigate("/verify");
        }
      };
      tryVerify();
    }
  }, [profile]);

  const handleMail = async () => {
    const res = await sendVerificationMail({
      user: {
        id: user?.id ?? "",
        username: user?.username ?? "",
        email: user?.email ?? "",
      },
      token: user?.token ?? "",
    });
    if (res.sent) {
      toast.success("Mail Sent Successfully!");
    } else {
      toast.error("Failed to Send Mail\nPlease Try Again");
    }
  };
  return (
    <div>
      <p>VerifyEmailPage</p>
      <button onClick={handleMail}>Verify</button>
    </div>
  );
};

export default VerifyEmailPage;
