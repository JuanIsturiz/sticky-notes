import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../contexts/user-context";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../../lib/validations";
import { z } from "zod";
import toast from "react-hot-toast";
import { signIn } from "../../lib/api/user.api";
import { useNavigate } from "react-router-dom";
const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    try {
      const res = await signIn(data);
      if (res.errors) {
        toast.error("Invalid Credentials!");
        return;
      }
      setUser({ ...res.user, token: res.token });
      toast.success("User Logged In Successfully!");
      navigate("/");
    } catch (err: any) {
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-gray-300 font-medium mb-1">
            Email or Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="John_Doe"
            className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
            {...register("username", { required: true })}
          />
          <span className="text-sm font-medium text-red-500 mt-1 ml-1">
            {errors.username?.message}
          </span>
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
            {...register("password", { required: true })}
          />
          <span className="text-sm font-medium text-red-500 mt-1 ml-1">
            {errors.password?.message}
          </span>
        </div>
        <button className="w-2/3 py-1.5 px-3 mt-2 bg-custom-4 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
