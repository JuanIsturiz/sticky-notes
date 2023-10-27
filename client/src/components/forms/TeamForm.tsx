import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { NewTeamSchema } from "../../lib/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  createTeam,
  deleteTeam,
  getTeamById,
  updateTeam,
} from "../../api/team.api";
import toast from "react-hot-toast";
import { useUserContext } from "../../contexts/user-context";

const TeamForm = ({ id }: { id: string | undefined }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof NewTeamSchema>>({
    resolver: zodResolver(NewTeamSchema),
  });

  useEffect(() => {
    if (id) {
      const loadNote = async () => {
        setLoading(true);
        const res = await getTeamById(id);
        setValue("name", res.team.name);
        setValue("description", res.team.description);
        setValue("is_private", res.team.is_private);
        setLoading(false);
      };
      loadNote();
    }
  }, []);

  const onSubmit = async (data: z.infer<typeof NewTeamSchema>) => {
    const { name, description, is_private, password } = data;
    setLoading(true);
    if (id) {
      const { updated } = await updateTeam({
        id,
        name,
        description: description ?? null,
        is_private,
        password: password ?? null,
      });
      if (updated) {
        toast.success("Team Updated Successfully!");
        navigate("/teams");
      } else {
        toast.success("Failed to Update Team\nPlease Try Again");
      }
    } else {
      const { created } = await createTeam({
        admin: user?.id ?? "",
        name,
        description: description ?? null,
        is_private,
        password: password ?? null,
      });
      if (created) {
        toast.success("Team Created Successfully!");
        navigate("/teams");
      } else {
        toast.success("Failed to Create Team\nPlease Try Again");
      }
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    const check = window.confirm("Delete Team Completely?");

    if (check) {
      const { deleted } = await deleteTeam(id ?? "");
      if (deleted) {
        toast.success("Team Deleted Successfully!");
        navigate("/teams");
      } else {
        toast.error("Failed to Delete Team\nPlease Try Again");
      }
    }
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
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onClick={() => setIsPrivate(!isPrivate)}
            {...register("is_private")}
          />
          <div className="w-11 h-6 bg-custom-2 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full peer-checked:after:border-custom-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-custom-5 after:border-custom-5 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-3"></div>
          <span className="ml-3 font-medium text-custom-4">Private</span>
        </label>
      </div>
      {isPrivate && (
        <>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-300 font-medium mb-1"
            >
              Password
            </label>
            <input
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
            <span className="text-sm font-medium text-red-500 mt-1 ml-1">
              {errors.confirmation?.message}
            </span>
          </div>
        </>
      )}
      <button
        disabled={loading}
        className="w-2/3 py-1.5 px-3 mt-2 bg-custom-4 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80"
      >
        {loading ? "Loading" : "Submit"}
      </button>
      {id && (
        <>
          <hr className="border-custom-3" />
          <div className="space-y-1">
            <p className="font-medium text-red-500">Danger Zone</p>
            <button
              onClick={handleDelete}
              className="w-56 mx-auto bg-red-500 font-bold text-lg p-2 rounded-sm transition-opacity hover:opacity-80"
              type="button"
            >
              Delete Team
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default TeamForm;
