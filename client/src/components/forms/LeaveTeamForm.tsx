import { useForm } from "react-hook-form";
import { z } from "zod";
import { LeaveTeamSchema } from "../../lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getMembers, teamAction } from "../../api/team.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LeaveTeamFormProps {
  teamId: string;
  userId: number;
}
const LeaveTeamForm: React.FC<LeaveTeamFormProps> = ({ teamId, userId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<{ id: number; username: string }[]>(
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LeaveTeamSchema>>({
    resolver: zodResolver(LeaveTeamSchema),
    defaultValues: {
      admin: userId,
    },
  });

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      const { members } = await getMembers(teamId);
      setOptions(members);
      setLoading(false);
    };
    loadMembers();
  }, []);

  const onSubmit = async (data: z.infer<typeof LeaveTeamSchema>) => {
    if (data.admin === userId) return;
    const { success } = await teamAction({
      action: "leave",
      password: null,
      teamId,
      userId: userId.toString(),
      newAdmin: data.admin,
    });
    if (success) {
      toast.success("Team Leaved Successfully!");
      navigate("/teams");
    } else {
      toast.error("Failed to Leave Team\nPlease Try Again");
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="admin" className="text-gray-300 font-medium mb-1">
          New Admin
        </label>
        <select
          id="admin"
          className="text-white bg-custom-2 p-1.5 border-none outline-none focus:ring-0"
          {...register("admin", {
            setValueAs(value) {
              return Number(value);
            },
          })}
        >
          {options.map((o) => (
            <option key={o.id} value={o.id} disabled={o.id === userId}>
              {o.username}
            </option>
          ))}
        </select>
        <span className="text-sm font-medium text-red-500 mt-1 ml-1">
          {errors.admin?.message}
        </span>
      </div>
      <button
        disabled={loading}
        className="w-2/3 py-1.5 px-3 mt-2 bg-red-500 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80"
      >
        {loading
          ? "Loading"
          : options.length == 1
          ? "Leave and Delete"
          : "Leave"}
      </button>
    </form>
  );
};

export default LeaveTeamForm;
