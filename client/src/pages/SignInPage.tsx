import SignInForm from "../components/forms/SignInForm";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <div className="m-2 sm:m-auto sm:mt-4 max-w-xl p-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
      <h2 className="text-3xl font-bold text-custom-4 mb-2 text-center">
        Sign In
      </h2>
      <SignInForm />
      <div className="flex items-center gap-2 justify-center my-4">
        <div className="w-48 h-[1px] bg-custom-4" />
        <p className="font-medium text-custom-4">or</p>
        <div className="w-48 h-[1px] bg-custom-4" />
      </div>
      <div>
        <p className="text-center text-lg text-gray-300">
          Doesn't have an account? Register{" "}
          <Link to={"/sign-up"}>
            <span className="font-medium text-custom-4 hover:underline">
              here.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
