import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { JoinTeamSchema } from "../../lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamAction } from "../../api/team.api";
import toast from "react-hot-toast";
import { useState } from "react";

interface JoinTeamFormProps {
  teamId: string;
  userId: string;
}
const JoinTeamForm: React.FC<JoinTeamFormProps> = ({ teamId, userId }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof JoinTeamSchema>>({
    resolver: zodResolver(JoinTeamSchema),
  });

  const onSubmit = async (data: z.infer<typeof JoinTeamSchema>) => {
    setLoading(true);
    const { success, message } = await teamAction({
      teamId,
      password: data.password,
      action: "join",
      userId,
    });
    if (success) {
      toast.success("Team Joined Successfully!");
      navigate(`/teams/${teamId}`);
    } else {
      toast.error(message || "Error!\nPlease Try Again");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-gray-300 font-medium mb-1">
          Password
        </label>
        <input
          autoFocus
          id="password"
          type="password"
          placeholder="some-secure-password"
          className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
          {...register("password")}
        />
        <span className="text-sm font-medium text-red-500 mt-1 ml-1">
          {errors.password?.message}
        </span>
      </div>
      <button
        disabled={loading}
        className="w-2/3 py-1.5 px-3 mt-2 bg-custom-4 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80"
      >
        {loading ? "Loading" : "Submit"}
      </button>
    </form>
  );
};

export default JoinTeamForm;
