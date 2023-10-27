import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { NewTeamSchema } from "../../lib/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TeamForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NewTeamSchema>>({
    resolver: zodResolver(NewTeamSchema),
  });

  const onSubmit = (data: z.infer<typeof NewTeamSchema>) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-300 font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Team 1"
          className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
          {...register("name", { required: true })}
        />
        <span className="text-sm font-medium text-red-500 mt-1 ml-1">
          {errors.name?.message}
        </span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-gray-300 font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          placeholder="Team 1 description..."
          className="text-white bg-custom-2 p-1.5 border-none outline-none rounded-sm focus:ring-0"
          {...register("description")}
        ></textarea>
        <span className="text-sm font-medium text-red-500 mt-1 ml-1">
          {errors.description?.message}
        </span>
      </div>
      <button className="w-2/3 py-1.5 px-3 mt-2 bg-custom-4 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80">
        Submit
      </button>
    </form>
  );
};

export default TeamForm;
