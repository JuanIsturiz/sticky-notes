import SignUpForm from "../components/forms/SignUpForm";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="max-w-xl mx-auto p-4 mt-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
      <h2 className="text-3xl font-bold text-custom-4 mb-2 text-center">
        Sign Up
      </h2>
      <SignUpForm />
      <div className="flex items-center gap-2 justify-center my-4">
        <div className="w-48 h-[1px] bg-custom-4" />
        <p className="font-medium text-custom-4">or</p>
        <div className="w-48 h-[1px] bg-custom-4" />
      </div>
      <div>
        <p className="text-center text-lg text-gray-300">
          Already have an account? Log In{" "}
          <Link to={"/sign-in"}>
            <span className="font-medium text-custom-4 hover:underline">
              here.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
