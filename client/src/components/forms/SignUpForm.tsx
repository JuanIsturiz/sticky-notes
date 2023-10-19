import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "../../lib/validations";
import { z } from "zod";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    console.log({ data });
  };

  console.log(errors);
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-300 font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="johndoe@mail.com"
            className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
            {...register("email", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-gray-300 font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="John_Doe"
            className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
            {...register("username", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-300 font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="some-secure-password"
            className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirmation"
            className="text-gray-300 font-medium mb-1"
          >
            Password Confirmation
          </label>
          <input
            id="confirmation"
            type="password"
            placeholder="some-secure-password"
            className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
            {...register("confirmation", { required: true })}
          />
        </div>
        <button className="w-2/3 py-1.5 px-3 mt-2 bg-custom-4 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
