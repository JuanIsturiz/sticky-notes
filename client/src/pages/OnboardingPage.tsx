import UserProfileForm from "../components/forms/UserProfileForm";

const OnboardingPage = () => {
  return (
    <div className="m-2 sm:m-auto sm:mt-4 max-w-xl sm:mx-auto p-4 mt-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
      <h2 className="text-3xl font-bold text-custom-4 mb-2 text-center">
        Onboarding
      </h2>
      <UserProfileForm />
    </div>
  );
};

export default OnboardingPage;
