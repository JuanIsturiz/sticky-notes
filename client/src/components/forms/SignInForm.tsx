const SignInForm = () => {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="email-username"
            className="text-gray-300 font-medium mb-1"
          >
            Email or Username
          </label>
          <input
            id="email-username"
            type="text"
            placeholder="John_Doe"
            className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-300 font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
            placeholder="some-secure-password"
          />
        </div>
        <button className="w-2/3 py-1.5 px-3 mt-2 bg-custom-4 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
