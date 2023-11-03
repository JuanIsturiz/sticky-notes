import { useUserContext } from "../contexts/user-context";
import { sendVerificationMail, verifyUser } from "../api/user.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { user, profile } = useUserContext();
  const [search, _] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState({ status: false, message: "" });

  console.log({ loading, disabled });
  useEffect(() => {
    setDisabled({ status: true, message: "Checking user status" });
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
    setDisabled({ status: false, message: "" });
  }, [profile]);

  const handleMail = async () => {
    setLoading(true);
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
    setLoading(false);
    setDisabled({
      status: true,
      message: "Please wait a few seconds to try again",
    });
    setTimeout(() => {
      setDisabled({ status: false, message: "" });
    }, 10000);
  };
  return (
    <div className="p-8 text-center">
      <div className="mb-2">
        <h2 className="text-3xl text-custom-5 font-medium">
          Verify Your Email
        </h2>
        <p className="text-xl text-custom-4 font-medium">
          Please click the verify and follow the email instrucctions!
        </p>
      </div>
      <button
        disabled={loading || disabled.status}
        onClick={handleMail}
        className="w-96 py-1.5 px-3 mt-2 bg-custom-4 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80"
      >
        {!loading && !disabled.status && "Verify Email"}
        {loading && "Loading"}
        {disabled.status && disabled.message}
      </button>
    </div>
  );
};

export default VerifyEmailPage;
