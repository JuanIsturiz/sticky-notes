import { zodResolver } from "@hookform/resolvers/zod";
import { NewNoteSchema } from "../lib/validations";
import { useForm } from "react-hook-form";
import z from "zod";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNote,
  deleteNote,
  getNoteById,
  updateNote,
} from "../api/note.api";
import { useUserContext } from "../contexts/user-context";
import toast from "react-hot-toast";
import { useEffect } from "react";

const NoteWizardPage = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const { register, handleSubmit, reset, setValue } = useForm<
    z.infer<typeof NewNoteSchema>
  >({
    resolver: zodResolver(NewNoteSchema),
  });

  useEffect(() => {
    if (id) {
      const loadNote = async () => {
        const res = await getNoteById(id);
        setValue("private", res.note.private);
        setValue("body", res.note.body);
      };
      loadNote();
    }
  }, []);

  const onSubmit = async (data: z.infer<typeof NewNoteSchema>) => {
    if (!data.body && !id) {
      navigate("/notes");
      return;
    }

    if (!data.body && id) {
      const res = await deleteNote(id);
      if (res.deleted) {
        toast.success("Note Deleted Successfully!");
        navigate("/notes");
      } else {
        toast.error("Failed to Delete Note\nPlease Try Again");
      }
      return;
    }
    if (!id) {
      const res = await createNote({
        ...data,
        author: user?.id ?? "",
        last_user: user?.id ?? "",
      });
      if (res.created) {
        toast.success("New Note Added Successfully!");
        navigate("/notes");
      } else {
        toast.error("Failed to Add New Note\nPlease Try Again");
      }
    } else {
      const res = await updateNote({
        id,
        data: {
          ...data,
          last_user: user?.id ?? "",
        },
      });
      if (res.updated) {
        toast.success("Note Updated Successfully!");
        navigate("/notes");
      } else {
        toast.error("Failed to Update Note\nPlease Try Again");
      }
    }
  };
  return (
    <div className="max-w-xl mx-auto p-4 mt-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center border-b border-b-custom-2 p-0.5">
          <button
            className="group cursor-pointer h-6 flex items-center pb-1"
            type="submit"
          >
            <ChevronLeft
              size={24}
              color="#5C8374"
              className="transition-transform group-hover:-translate-x-1"
            />
            <p className="text-xl text-custom-4">Back</p>
          </button>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("private")}
              />
              <div className="w-11 h-6 bg-custom-2 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full peer-checked:after:border-custom-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-custom-5 after:border-custom-5 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-3"></div>
              <span className="ml-3 font-medium text-custom-4">Read Only</span>
            </label>
          </div>
        </div>
        <textarea
          autoFocus
          className="w-full min-h-[60vh] text-lg bg-transparent caret-custom-5 text-custom-5 rounded-sm resize-none border-none outline-none focus:ring-0"
          {...register("body")}
        ></textarea>
      </form>
    </div>
  );
};

export default NoteWizardPage;
